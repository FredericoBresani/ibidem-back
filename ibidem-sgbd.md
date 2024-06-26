# Grupo Ibidem platform management System

## Our collections

##### **Users**: Those will be our clients, whom will have access to almost every ibidem feature**; the ones with the author attribute setted to true will have access to the features the commom users have plus some others, as, creating, editing, deleting and posting articles
- **_id** (ObjectId - UNIQUE, Indentifier)
- **username**; (String - UNIQUE)
- **temp_username**; (String - UNIQUE, used to update accounts)
- **email**; (String - UNIQUE)
- **temp_email**; (String - UNIQUEE, used to update accounts)
- **password**; (String - MIN length 8 - MAX length 20)
- **temp_password**; (String - MIN length 8 - MAX length 20)
- **author**; (Boolean, if true, the user is an content author)
- **user_image**; (String - DEFAULT = 'none', image endpoint)
- **register_date**; (Date, when the account is registered)
- **birth_date**; (Date)
- **temp_birth_date**; (Date, used to update accounts)
- **avocados**; (Number, account points)
- **confirmation**; ('register' | 'update' | 'recover' | null, used to account confirmations)
- **receive_emails**; (Boolean, when the user wants to receive ibidem emails, set it to true)
- **temp_receive_emails**; (Boolean, used to update accounts)
- **created_at**; (Date)
- **updatedAt**; (Date)
- **_v**; (Number, ?)

##### Articles: Those are articles, which will be present at the contents page, indentifier(author, title) || (_id)
- **_id**; (ObjectId - UNIQUE, Identifier)
- **url**; (String, endpoint to the article)
- **author**; (String, name of the author)
- **image**; (String, the image endpoint)
- **description**; (String)
- **image_description**; (String)
- **title**; (String)
- **subtitle**; (String)
- **category**; (String)
- **access_count**; (Number)
- **created_at**; (Date)
- **updatedAt**; (Date)
- **_v**; (Number, ?)

##### Unfinished_courses: identifier(name, author_id) || (_id)
- **_id**; (ObjectId - UNIQUE)
- **name**; (String)
- **author_id**; (ObjectId)
- **access_count**; (Number)
- **emails[]**; (String)
- **created_at**; (Date)
- **updatedAt**; (Date)
- **_v**; (Date)

##### Courses: identifier(title, author_id) || (_id)
- **_id**; (ObjectId - UNIQUE)
- **title**; (String)
- **subtitle**; (String)
- **author_id**; (ObjectId)
- **trailer_link**; (String, youtube video link)
- **price**; (Number)
- **objective**; (String)
- **details[]**; (String)
- **includes[]**; (String)
- **for_whom[]**; (String)
- **do_it_if[]**; (String)
- **answered_questions[]**; (String)
- **what_is_needed[]**; (String)
- **about_instructor[]**; (String)
- **about_methodology[]**; (String)
- **modules[]**; (String)
- **score**; (Number)
- **created_at**; (Date)
- **updatedAt**; (Date)
- **_v**; (Number, ?)

##### Courses_evaluations: identifier(course_id, username) || (_id)
- **_id**; (ObjectId - UNIQUE)
- **username**; (String)
- **course_id**; (ObjectId)
- **stars**; (Number)
- **comment**; (String)
- **created_at**; (Date)
- **updatedAt**; (Date)
- **_v**; (Number)


