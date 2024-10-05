from rest_framework.response import Response
from rest_framework.decorators import api_view
# from .scraper import scrape_website

# @api_view(['GET'])
# def get_events(request):
#     scraped_data = scrape_website()
    
#     if scraped_data:
#         return Response(scraped_data)
#     else:
#         return Response({"error": "Failed to scrape data"}, status=500)
