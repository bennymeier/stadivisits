# Stadivists

## Technologies

- Next.js
- TypeScript
- React
- Mongoose
- MongoDB
- Next-Auth
- Package Manager: pnpm

### Database Models

#### User

|       #       |   type    |
| :-----------: | :-------: |
|      id       |  string   |
|     name      |  string   |
|     mail      |  string   |
| emailVerified | timestamp |
|     image     |  string   |

#### VerificationToken

|     #      |   type    |
| :--------: | :-------: |
| identifier |  string   |
|   token    |  string   |
|  expires   | timestamp |

#### Session

|      #       |   type    |
| :----------: | :-------: |
|      id      |  string   |
|   expires    | timestamp |
| sessionToken |  string   |
|    userId    |  string   |

#### Stadium

|         #         |   type    |
| :---------------: | :-------: |
|        id         |  string   |
|       name        |  string   |
|     longitude     |  number   |
|     latitude      |  number   |
|       city        |  string   |
|      country      |  string   |
| constructionStart | timestamp |
|      opening      | timestamp |
|       costs       |  number   |
|     capacity      |  number   |

#### Post

|      #      |   type    |
| :---------: | :-------: |
|     id      |  string   |
|   user.id   |  string   |
| stadium.id  |  string   |
|   message   |  string   |
| visitedDate | timestamp |

#### Post Images

|    #    |                type                 |
| :-----: | :---------------------------------: |
|   id    |               string                |
| post.id |               string                |
|  image  | {data: buffer, contentType: string} |
