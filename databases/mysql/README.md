https://console.aiven.io/account/a46e0aa9c34d/project/bucino-43d7/services/mysql-sibu/overview

- nahrada pre mysql

mysql -h mysql-sibu.mysql.database.azure.com -u sibu -p

- heslo je skratena verzia s velkymi pismenami a ziadnym special znakom medzi cislom

use `show grants;` to display what grants a user has

transactions

- whenever we execute a transaction it is automatically commit by mysql mode
- are collection of queries

ACID

- atomic
  - transactions must happen as unit
- consistency
  - after transaction happens, all constrains must be satisied
- isolations
  - concurrent transaction must not affect each other
- durability
  - one the transaction is done, it should be preserved in non volatile storage

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

normalization forms

- 1NF
  - all values must be atomic and have a unique identifier
- 2NF
  - there can not be any partial dependency, which means that all non key columns must fully depend (describe) what the primary key is describing
- 3NF
  - there can not be any transiive dependency, which means that all not key columns does not depend on other not key columns. You can also say that one column can not be GUESSED from the other column

Isolation levels and violations in sql
Violations:

- Lost updates
  - Is when T1 reads that there is 10 items in stock and process to remove 1, while a second transation reads also 10 and removes 2 and updates the stock to be 8 and then later T1 updates the stock to be 9 instead of 7
- Dirty reads
  - T1 write a data and T2 read the data before T1 commits them. Problem is, that if T1 rollsback, then T2 works with a wrong data
- Non repeatable reads
  - T1 reads a data and then T2 updates the data. If T1 reads the same data as before, it will get a diff result as before
- Phantom
  - it is similar to non repeatable reads but here lets say T1 queries a data and get 2 row based on condition, while the T2 will insert a new row that maches the condition. So when T1 queries the data again, it will get 3 row instead of 2 and this extra row is called a phantom

Isolations levels(like solutions to the violations)

- Read uncommited
  - transations see are changes that happens outside of the translation
  - provides almost no protecion agains lost updates, dirty reads, non repeatable reads and phantoms
- Read commited
  - each query in the translation only sees the commited stuff
  - provides protection against dirty reads but no protection for lost updates, non repeatable reads and phantoms
- Repeatable read
  - each query in the transation only sees commited updates at the beginnig of the translation
  - provides protection against dirty reads, lost updates and non repeatable reads but no protection against phantoms
- Serializable
  - provides a protection agains all the above mentioned problems but it can be slow as translations are running in a sequence

Indexes

- clustered indexes
  - leaf nodes actually holds the data
    unclustered indexes
  - leaf nodes does not hold the actual data, but it holds the reference to the actual data

Use `explain` to see how a DB perform a query and how many row it needed to search
