import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Button, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../AuthContext';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSegments } from 'expo-router';
import SmileyFaceSmall from '@/components/SmileyFaceSmall';

interface User {
  id: string;
  username: string;
  nickname: string;
  email: string;
}

interface Request {
  id: string;
  sender: string;
  sender_n: string;
  receiver: string;
}

interface EventListProps {
  keyword: string;
}

const EventList = ({ keyword }: EventListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [ended, setEnded] = useState(false); 
  const { account } = useAuth(); 
  const flatListRef = useRef<FlatList>(null);
  const naviation = useNavigation();
  const segments = useSegments()
  const [sentRequests, setSentRequests] = useState(new Set<string>());

  const fetchRequests = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/get-sents/?username=${account}`;
      const response = await fetch(url);
      const data = await response.json();
  
      const req: Request[] = data.map((item: any): Request => ({
        id: item.id,
        sender: item.sender,
        sender_n: item.sender_n,
        receiver: item.receiver,
      }));

      const requestSet = new Set(req.map(request => request.receiver));
      setSentRequests(requestSet);
  
      console.log("Friend requests fetched:", req);
      console.log("Sent requests set:", requestSet);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  const fetchEvents = async (pageNum: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const baseUrl = `http://127.0.0.1:8000/api/userlist/search`;
      const queryParams = `?page=${pageNum}&page_size=10`;
      const usernameParam = account ? `&username=${account}` : "";
      const keywordParam =  keyword ? `&q=${keyword}` : "";
      const url = `${baseUrl}${queryParams}${usernameParam}${keywordParam}`;
      const response = await fetch(url);
      const data = await response.json();
      const transformedEvents: User[] = data.map((item: any): User => ({
        id: item.id.toString(),
        username: item.username,
        nickname: item.nickname,
        email: item.email,
      }));

      const response_f = await fetch(`http://127.0.0.1:8000/api/get-friends/?username=${account}`);
      const data_f = await response_f.json();
      const friendsList = new Set(data_f[0].friends.map(friend => friend.username));
      const nonFriends = transformedEvents.filter(user => !friendsList.has(user.username));
      const nonSelf = nonFriends.filter(user => user.username != account);

      setUsers((prevEvents) => [...prevEvents, ...nonSelf]);

    } catch (error) {
      console.error('Error fetching users and friends:', error);
      setEnded(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUsers([]);
    setPage(0);
    setEnded(false);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // Scroll to top when keyword changes
    }
  }, [keyword]);

  useEffect(() => {
    setUsers([]);
    setPage(0);
    setEnded(false);
    fetchRequests();
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 }); // Scroll to top when keyword changes
    }
  }, [account]);

  useEffect(() => {
    fetchRequests();
    setUsers([]);
    setPage(0);
    setEnded(false);
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
    }, [segments])

  useEffect(() => {
    if(page === 0) setPage(1);
    else fetchEvents(page);
  }, [page]);

  useEffect(() => {
  }, [])

  const handleEndReached = () => {
    if (!loading && !ended) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const sendFriendRequest = async (username: string) => {
    const senderId = account;
    const receiverId = username;
    
    const url = `http://127.0.0.1:8000/api/send-request/?sender=${senderId}&receiver=${receiverId}`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.success);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Failed to send friend request. Check your connection.");
    }
  };
  
  const renderItem = ({ item }: any) => (
    <TouchableOpacity>
      <View style={styles.eventCard}>
        <View style={styles.eventImage}>
        </View>
        <View style={styles.eventTextContainer}>
          <Text style={styles.eventName}>{item.nickname}</Text>
          <Text style={styles.eventDate}>{item.email}</Text>
          <TouchableOpacity
            style={[styles.reqButton, sentRequests.has(item.username) ? styles.disabledButton : {}]}
            onPress={() => sendFriendRequest(item.username)}
            disabled={sentRequests.has(item.username)} // Disable button if request exists
          >
            <Text style={styles.buttonText}>
              {sentRequests.has(item.username) ? "Requested" : "Request"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.eventList}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.3} 
      ListFooterComponent={loading ? <Text>Loading...</Text> : null} 
    />
  );
};

const MessageList = () => {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true);
  const { account } = useAuth();

  const fetchRequests = async () => {
    if (account){
      try{
        const url = `http://127.0.0.1:8000/api/get-request/?username=${account}`;
        const response = await fetch(url);
        const data = await response.json();
        const req: Request[] = data.map((item: any): Request => ({
          id: item.id,
          sender: item.sender,
          sender_n: item.sender_n,
          receiver: item.receiver,
        }));
        setRequests(req)
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      } finally {
        setLoading(false);
      }
    }
  }

  const rejRequests = async (id, receiver) => {
    if (account){
      try{
        const url = `http://127.0.0.1:8000/api/rej-request/?id=${id}&receiver=${receiver}`;
        const response = await fetch(url);
        if(response.ok){
          alert("Successfully rejected request")
        } else {
          alert("Failed to reject request")
        }
      } catch (error) {
        alert(error);
      }
    }
  }

  const accRequests = async (id, receiver) => {
    if (account){
      try{
        const url = `http://127.0.0.1:8000/api/acc-request/?id=${id}&receiver=${receiver}`;
        const response = await fetch(url);
        if(response.ok){
          alert("Successfully accepted request")
        } else {
          alert("Failed to accepted request")
        }
      } catch (error) {
        alert(error);
      }
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <View style={styles.messageList}>
      {loading ? (
        <ActivityIndicator size="large" color="#4A61DD" />
      ) : requests.length > 0 ? (
        requests.map((request, index) => (
          <View key={index}>
            <Text style={styles.message}>
              {request.sender_n} requested to be your friend
            </Text>
            <View style={{flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={() => {accRequests(request.id, request.receiver)}}>
                <Text>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {rejRequests(request.id, request.receiver)}}>
                <Text>Ignore</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noMessages}>No messages</Text>
      )}
    </View>
  );
}

const App = () => {

  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [showMessages, setShowMessages] = useState(false);

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  const handleInputChange = (input: string) => {
    setKeyword(input);
  };

  const handleEnterKey = () => {
    setQuery(keyword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.icon}>
        <SmileyFaceSmall/>
        <Text style={styles.title}>
          Comm-<Text style={styles.highlight}>YOU</Text>-nity
        </Text>
        <TouchableOpacity style={styles.mailIcon}>
          <Ionicons name="mail" size={28} color="#4A61DD" onPress={toggleMessages}/>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#999"
            onChangeText={handleInputChange}
            onSubmitEditing={handleEnterKey}
            value={keyword}
          ></TextInput>
      </View>

      {showMessages && (
        <View style={styles.messageContainer}>
          <MessageList />
        </View>
      )}

      {/* list of events */}
      <EventList keyword={query}/>

    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    margin: 10,
    flexDirection: 'row'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginLeft: 40
  },
  highlight: {
    color: '#4E4AFD',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  searchBar: {
    width: '75%',
    backgroundColor: '#EFEFEF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  eventList: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#EDE9FF',
    padding: 8,
    borderRadius: 10,
    marginBottom: 15,
  },
  eventTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  eventName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 15,
    color: '#000000',
    marginTop: 3,
  },
  eventTime: {
    fontSize: 14,
    color: '#555555',
    marginTop: 3,
  },
  eventTags: {
    fontSize: 12,
    color: '#999999',
    marginTop: 3,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#C5B9FF",
    alignSelf: 'center',
  },
  image: {
    margin: 5,
    width: 90,
    height: 90,
    borderRadius: 9,
    resizeMode: "cover",
  },
  reqButton: {
    backgroundColor: "#4A61DD",
    marginLeft: 120,
    marginTop: 40,
    height: 30,
    width: 80,
    padding: 3,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc", // Gray out button
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  mailIcon:{
    marginLeft: 50
  },
  messageList: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    paddingVertical: 5,
  },
  noMessages: {
    fontSize: 16,
    textAlign: "center",
    color: "#999",
  },
  messageContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
    width: 250, 
    zIndex: 9999, 
  },
});
