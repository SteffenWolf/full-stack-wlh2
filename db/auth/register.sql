insert into users (username, password, balance, user_img)
values (${username}, ${password}, 0, 'https:
//image.shutterstock.com/image-photo/acction-baby-otter-on-tfhe-260nw-615640433.jpg')
returning id, username, balance, user_img