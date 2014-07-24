This is just a quick and dirty project using Node and Redis.  I'll add tests and expand the ui to use Angular/Bootstrap when I get a chance


Instructions:
This assumes you're trying to run on Windows.  I'll add Mac/Nix instructions when I get a chance

Prereqs: You'll need to have Redis installed (https://github.com/rgl/redis/downloads)

1. Open a cmd shell, Start redis server (C:\Program Files\Redis>redis-server)
2. Open another cmd shell, cd to this dir (BankTywin), type "node tcp"
3. Open another cmd shell, cd to this dir (BankTywin), type "node tcpClient"
4. Open another cmd shell, cd to this dir (BankTywin), type "node httpServer"
5. open browser to 'localhost/3000'
6. copy/paste JSON data into tcpClient, one at a time
7. after each, check browser to see how it automatically sorts based on value of the balance field 


Oh, and by the way, I haven't seen Season 4 yet, so if the test data is a little out of date, please forgive me. :)