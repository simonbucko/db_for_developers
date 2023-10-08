mysql -h mysql-sibu.mysql.database.azure.com -u sibu -p

heslo je skratena verzia s velkymi pismenami a ziadnym special znakom medzi cislom

transactions

- whenever we execute a transaction it is automatically commit by mysql mode

stored procedures

- they differ from the views in the way that they also allow you to do some inserts, updates, deletes

temporary tables

- they differ from the views that the view is populated each time you run the table name where else temporary tables exists virtually only per db session

cursor

- is an object that allows iterate over the result of the query one item at the time

union

- it is like combining two tables on top of each other and they need to have the same amount of columns
- union all will also return any duplicates accross the tables

views

- it is a virtual tables but can be interacted with as they are real tables and they are always up to date

rollup

- it add the a new row where it aggregates all the rows and it is an extension of group by

events

- something that happens or run on the schedule

triggers

- they run when certain events happen like for example insert

advantages and disadvantages of using stored procedures

- advantages

  - they are faster
  - they reduce the network traffic

- disadvantages
  - it is hard to debug
  - it is hard to maintain
  - it is db specific
  - it utilizes more memory and cpu usage

partition

- dividing large dataset into a smaller pieces so it is easier to query the data.
- vertical paritioning is when we break down the table into a smaller tables
- horizontal partitioning is when we copy the schema and split the data based on some sharding key and usually is done between multiple servers or nodes
