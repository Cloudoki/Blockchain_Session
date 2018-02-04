# Sandbox API gateway

## Overview
This server is based on Flask

## Requirements
Python 3.5.2+
Flask

## Usage
To run the server, please execute the following from the root directory:

```
pip3 install -r requirements.txt
python3 -m .
```

Set up your local environment settings by copying `.env.example` to `.env` and fill in the placeholders.

and open your browser to here:

```
http://localhost:5000/v1/ui/
```

Your Swagger definition lives here:

```
http://localhost:5000/v1/swagger.json
```

## Sandbox API info
location:
https://tex-oauth.eu-gb.mybluemix.net/
https://tex-api.eu-gb.mybluemix.net/

Client credentials
cloudoki:secret

https://tex-oauth.eu-gb.mybluemix.net/

swagger:
https://tex-api.eu-gb.mybluemix.net/swagger-ui.html
https://tex-oauth.eu-gb.mybluemix.net/swagger-ui.html

auth: OAuth2 bearer token
client: cloudoki:secret
access token:
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIl0sInNjb3BlIjpbInBheW1lbnRzIiwicGF5bWVudC1zdWJtaXNzaW9ucyIsImFjY291bnRzIiwiYmFsYW5jZXMiXSwiZXhwIjozNjY0Nzk4ODYzLCJhdXRob3JpdGllcyI6WyJST0xFX1RSVVNURURfQ0xJRU5UIiwiUk9MRV9DTElFTlQiXSwianRpIjoiNzQ0YTE0YmItZTMxNS00ODQwLWE4NzItNWVhOWI2MTNmM2M2IiwiY2xpZW50X2lkIjoiY2xvdWRva2kifQ.AE0iMw1Dp_sVNZ5H0nWvN1XxoHh8SRQzDBTHsUgVdtDGCNgvB69kVPa_qeXtGXlkU0H8FEoCjHjm_FHWDOgZVJ1hwAeAXwKV-ykKnYu3sbxvoC3nBUBLYfqzGYUbhrL6TDJjC94O6k_vOWkqyhlvtP7EeCvxRFxTVuDM4c25afY

scope: payments payment-submissions accounts balances

1. create profile
POST oauth/profiles
POST api/accounts with iban as identifier

{
   "iban": "BE12345678611254",
   "name": "Albert",
   "accountBalance": {
       "Amount": {
           "Amount": 1000
       }
   },
   "accountFamily": "CUR",
   "accountStatus": "FREE",
   "customerId": "0000000000"
}

2. transact
a. POST transaction
{
  "Data": {
    "Initiation": {
      "InstructionIdentification": "ANSM023",
      "EndToEndIdentification": "FRESCO.21302.GFX.37",
      "InstructedAmount": {
        "Amount": "20.00",
        "Currency": "EUR"
      },
      "DebtorAccount": {
        "SchemeName": "IBAN",
        "Identification": "BE11111111111111",
        "Name": "Thomas"
      },
      "CreditorAccount": {
        "SchemeName": "IBAN",
        "Identification": "BE42424242424242",
        "Name": "Trimplement"
      },
      "RemittanceInformation": {
        "Reference": "FRESCO-037",
        "Unstructured": "Internal ops code 5120103"
      }
    }
  },
  "Risk": {
    "PaymentContextCode": "PersonToPerson"
  }
}

b.
testing:Create token for client: http://tex-oauth.eu-gb.mybluemix.net/oauth/authorize?client_id=tex-user&response_type=code&redirect_uri=https://anypage.net/confirmPayment?paymentId=1234
testing: curl tex-user:secret@http://tex-oauth.eu-gb.mybluemix.net/oauth/token  -d "grant_type=authorization_code&code=CODE&redirect_uri=https://anypage.net?paymentId=1234"
client: tex-user

c. POST ..-submission with tex-user token
Succes:
{
    "Data": {
        "PaymentSubmissionId": "1-001",
        "PaymentId": "1",
        "Status": "AcceptedSettlementCompleted",
        "CreationDateTime": "2018-01-30T13:31:12+0000"
    },
    "Links": {
        "Self": "https://api-sandbox-payments.eu-gb.mybluemix.net/payment-submissions/1-001"
    },
    "Risk": {
        "PaymentContextCode": "PersonToPerson"
    },
    "Meta": {}
}

{
    "status": 401,
    "error": "Unauthorized",
    "message": "Unauthorized payment submission",
    "timeStamp": "Tue Jan 30 13:32:15 UTC 2018",
    "trace": null
}


## Running with Docker

To run the server on a Docker container, please execute the following from the root directory:

```bash
# building the image
docker build -t swagger_server .

# starting up a container
docker run -p 8080:8080 swagger_server
```

## Running nginx oldschool
https://www.digitalocean.com/community/questions/flask-nginx-uwsgi-ubuntu-tutorial
