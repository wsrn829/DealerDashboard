import unittest
from unittest import mock

import django
import os
import sys
import json

from poller import poll

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from service_rest.models import AutomobileVO


# This method will be used by the mock to replace requests.get
def mocked_requests_get(*args, **kwargs):
    class MockResponse:
        def __init__(self, json_data, content, status_code):
            self.json_data = json_data
            self.content = content
            self.status_code = status_code

        def json(self):
            return self.json_data

    if args[0] == 'http://project-beta-inventory-api-1:8000/api/automobiles':
        data = {
            "autos": [
                {"href": "/api/automobiles/1/","vin": "1", "sold": True},
                {"href": "/api/automobiles/2/","vin": "2", "sold": True},
                {"href": "/api/automobiles/3/","vin": "3", "sold": True},
            ]
        }
        return MockResponse(data, json.dumps(data),200)

    return MockResponse(None, "", 404)


class Test_Poller(unittest.TestCase):

    @mock.patch('requests.get', side_effect=mocked_requests_get)
    def test_fetch(self, mock_get):
        AutomobileVO.objects.all().delete()
        poll(False)
        self.assertEqual(len(AutomobileVO.objects.all()), 3)
        AutomobileVO.objects.all().delete()


if __name__ == "__main__":
    unittest.main()
