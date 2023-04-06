## SHOWCASE_API
This repo contains the api collection for an an called showcase. It’s an event ticketing API service. It closely emulates the functionalities of https://tix.africa

#SETUP 
* Install NodeJS, mongodb
* pull this repo
* Open the folder on your local computer
* At the terminal, run `npm install` to install all packages
* run `npm run start:dev` or `nodemon` to start the server

## LIVE URL
[https://showcase-api-uk7d.onrender.com](https://showcase-api-uk7d.onrender.com)

# Models
### User
| Field  | Data type | constraint
| ------------- | ------------- |------------- |
| Email  | String  | unique, required |
| id | String | required |
| firstName | String | required |
| lastName | String | required |
| password | String | required |
| timestamps | String | required |
| country | String | required |
| businessName | String | required |

## Events
| Field  | Data type | constraint
| ------------- | ------------- |------------- |
| name	| String| required |
| description | String|	required |
| location | String |	optional |
| location_tip |String |	optional |
| event_type: ["virtual","physical"] | String |	required |
| virtual_meet_link | String | optional |
| userid | String | required |
| category	| String | required |
| custom_url	| String | optional |
| frequency	| Number | optional | 
| startDate | String | required |
| startTime	| String | optional |
| endDate	| String | required |
| endTime | String | optional |
| twitterUrl | String |	optional |
| facebookUrl	| String | optional |
| instagramUrl	| String | optional |

## Tickets
| Field  | Data type | constraint
| ------------- | ------------- |------------- |
| description | String| required |
| name | String| required |
| ticket_type: ["free", "paid","inviteOnly"] | String | required |
| stock: ["limited_stock","unlimited_stock"] | String| required |
| no_of_stock | Number | optional |
| purchase_limit | Number | required |
| price | Number | optional |
| event_id | String | required |
|timeStamp | Date | required |

## Payment Details Model
| Field  | Data type | constraint
| ------------- | ------------- |------------- |
| id | ObjectId | required |
| token | String | required |
| user_id | String | required |
| key | Object | required |
| iv | Object | required |
| timestamp | Date | required |

## Transaction Details
| Field  | Data type | constraint
| ------------- | ------------- |------------- |
| id | ObjectId | required |
| first_name | String | optional |
|  last_name | String | optonal |
| email | String | required |
|  fee | Number | optional |
| status | String | optional |
| amount | Number | required |
| no_of_purchase | Number | optional |
| ticket_id | String | required |
| reference | String | requirec |
| access_code | String | required |

## Database ER Diagram
The link to the Showcase Database ER diagram is found here [https://dbdiagram.io/d/640f3386296d97641d878941](https://dbdiagram.io/d/640f3386296d97641d878941)

## API Routes
All routes and API details can be found at the documentation [https://documenter.getpostman.com/view/19697282/2s93RZKoeD](https://documenter.getpostman.com/view/19697282/2s93RZKoeD)
