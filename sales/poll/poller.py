import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO

# Import models from sales_rest, here.
# from sales_rest.models import Something


def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            url = "http://inventory-api:8000/api/automobiles/"
            response = requests.get(url)
            content = json.loads(response.content)
            print("POLLER_CONTENT", content)
            for automobile in content["autos"]:
                AutomobileVO.objects.update_or_create(
                    vin=automobile["vin"],
                    defaults={
                        "color": automobile["color"],
                        "year": automobile["year"],
                        "sold": automobile["sold"]
                    },
                )
            # Write your polling logic, here
            # Do not copy entire file

        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
