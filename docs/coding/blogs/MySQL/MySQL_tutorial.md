---
title: MySQL Tutorial
author: azoux
tags:
  - Mysql
  - 后端
date: 2021-03-03
categories:
 - 后端
---


# chapter 1



## 什么是数据库？

SQL -- Structured Query Language

- relational database
  - tables
  - relationships

- non relational database

  

## windows安装MySQL



<a href="https://www.mysql.com/downloads/" target="_blank">MySQL Download</a>



## 创建数据库

schema

- tables
- views
- functions
- Stored Procedures



# Chapter 2



## SELECT



```mysql
USE azoux;

SELECT * 
FROM expend
-- WHERE eid = 001
ORDER BY cost DESC;

-- select columns
SELECT 
	cost,
    -- (cost * 10) * 10 AS 'real cost'  use '' or "" can use space on name
    (cost + 10) * 10 AS real_cost,
    type
FROM expend;

-- 返回集合（不重复）
SELECT DISTINCT balance
FROM account

```



## Operators

```mysql
-- operations ------------------------------------
>, <, =, >=, <=, <>, !=

select *
from store.customers
where state = 'VA';

select *
from store.customers
where
	state <> 'VA'
    and birth_date > '1990-01-01';

-- and or not
select *
from customers
where not (birth_date > '1990-01-01' or points > 1000 and state = 'VA');

-- in ------------------------------------
SELECT *
FROM store.customers
where state not in ('VA', 'FL', 'GA');

-- between 闭区间 ------------------------------------
SELECT *
FROM store.customers
where points between 1000 and 3000;

-- like ------------------------------------
-- 用%表示任意字符数
-- _下划线表示通配符，任意匹配一个字符 
SELECT *
FROM store.customers
where last_name like '%b%';

SELECT *
FROM store.customers
-- where phone like '%9';
-- where address like '%TRAIL%' or address like '%AVENUE%';
-- where address like '%TRAIL%' or address like '%AVENUE%' this is wrong
-- where address like ('%AVENUE%', '%TRAIL%'); this is wrong too

-- REGEXP ------------------------------------
-- 用^代表用什么字符串开头 例子：'^field' 表示用field的字符串
-- 用$表示用什么字符串结尾
-- 用 | 表示搜索模式 例子：'mac|field|rose'
-- [] 例子：[gma]e 匹配 ge me ae
-- [-] a range
SELECT *
FROM store.customers
-- where first_name regexp 'elka|ambur;'
-- where last_name regexp 'EY$|ON$';
-- where last_name regexp '^my|se';
-- where last_name regexp 'B[RU]';

-- is null ------------------------------------
-- 查询值为null
SELECT *
FROM store.orders
where shipper_id is null;
```





`MySQL关键字不区分大小写`

`一条语句结束需要使用 ; 来结尾`

`在关系型数据库钟每一个表都有一个主键`



## ORDER BY

```mysql
SELECT *
FROM store.order_items
where order_id = 2
order by quantity * unit_price desc;

SELECT *, quantity * unit_price as total_price
FROM store.order_items
where order_id = 2
order by total_price desc;
```



## The Limit Clause

```mysql
SELECT *
FROM store.customers
limit 6, 3; -- 6表示偏移量 最后返回 第7 8 9列的数据
```

`limit子句永远要放在最后面`



# chapter 3

## inner joins

```mysql
select order_id, o.customer_id, order_date -- 如果是两张表都有的列，需要指明是哪一列
from store.orders as o -- give another name to this table, as可以省略
inner join store.customers as c -- innner可以省略不写
	on o.customer_id = c.customer_id
	
SELECT order_id, oi.product_id, quantity, oi.unit_price
FROM store.order_items oi
join store.products p
	on p.product_id = oi.product_id
order by oi.unit_price * oi.quantity desc

```

## Joining Across Database

```mysql
SELECT order_id, oi.product_id, quantity, oi.unit_price
FROM store.order_items oi
join sql_inventory.products p
	on p.product_id = oi.product_id

```

## Self Joins

```mysql
select 
	e.employee_id,
    e.first_name,
    m.first_name as manager
from employees e
join employees m
	on e.reports_to = m.employee_id
	
-- 重点在于要取不同的别名
```

## Joining Multiple Tables

```mysql
use sql_store;

select
	o.order_id,
    o.order_date,
    c.first_name,
    c.last_name,
    os.name as status
from orders o
join customers c
	on c.customer_id = o.customer_id
join order_statuses os
	on os.order_status_id = o.status
```

## Compound Join Conditions

```mysql
select *
from order_items oi
join order_item_notes oin
	on oi.product_id = oin.product_id
    and oi.order_Id = oin.order_Id
    
 -- 复合主键的多表查询
```

## Implicit Join Syntax

隐式连接语法

```mysql
select *
from orders o
join customers c
	on o.customer_id = c.customer_id;

-- 隐式连接
select *
from orders o, customers c
where o.customer_id = c.customer_id

-- 所有的连接尽量都不要使用隐式连接
-- 使用join会让你不得不写条件， 会避免很多错误
```

## Outer Joins

outer joins

- left join
- right join

```mysql
SELECT
	c.customer_id,
    c.first_name,
    o.order_id
FROM customers c
left JOIN orders o
	on c.customer_id = o.customer_id
```

## Outer Joins Between Multiple Tables

```mysql
select
	c.customer_id,
    c.first_name,
    o.order_id,
    sh.name shipper
from customers c
left join orders o
	on c.customer_id = o.customer_id
left join shippers sh
	on o.shipper_id = sh.shipper_id
	
	
-- exercise
select
	o.order_date,
	o.order_id,
    c.first_name,
    sh.name status
from orders o
left join customers c
	on c.customer_id = o.customer_id
left join order_statuses os
	on os.order_status_id = o.status
left join shippers sh
	on sh.shipper_id = o.shipper_id
```

``尽量不要使用Right Join，改为使用Left Join 否则代码会变得很混乱``

## Self Outer Joins

```mysql
use sql_hr;

select *
from employees e
left join employees m
	on e.reports_to = m.employee_id
```

## The Using Clause

```mysql
-- 可以用using子句来替代两个表中相同的列名

select *
from customers c
join orders o
	-- on c.customer_id = o.customer_id
    using (customer_id)
join shippers sh
	using (shipper_id) -- 只能是两个表中列名相同的
	
select *
from order_items oi
join order_item_notes oin -- 如果是复合主键
	-- on oi.order_Id = oin.order_Id and oi.product_id = oin.product_id
    using (order_id, product_id)
    
   
-- exercise
use sql_invoicing;

select 
	p.date,
    c.name client,
    p.amount,
    pm.name
from payments p
join clients c
	using (client_id)
join payment_methods pm
	on pm.payment_method_id = p.payment_method

```

## Natural Joins

不建议使用，容易出现意想不到的结果

数据库引擎会自己看着办，基于共同的列连接

我们无法控制它

```mysql
select * 
from orders o
natural join customers c
```

## Cross Joins

会组合两张表里的项目，如：

table_1:

- 大
- 中
- 小

table_2:

- 红
- 绿
- 蓝

组合出来的结果就是：大红，大绿，大蓝，中红，中绿.....

```mysql
select 
	c.first_name as customer,
    p.name as product
from customers c
cross join products p
order by customer

-- 它的隐式语法
select 
	c.first_name as customer,
    p.name as product
from customers c, products p
```

## Unions

使用unions可以合并多段查询的记录

查询的列返回的数量一定要一样

第一段查询写了啥都会被用来决定列名

```mysql
select 
	o.order_id,
    o.order_date,
    'Active' as status
from orders o
where o.order_date >= '2019-01-01'

union

select
	o.order_id,
    o.order_date,
    'Archived' as status
from orders o
where o.order_date < '2019-01-01'

-- exercise
select 
	c.customer_id,
    c.first_name,
	c.points,
    'Bronze' as type
from customers c
where c.points <= 2000

union

select 
	c.customer_id,
    c.first_name,
	c.points,
    'Silver' as type
from customers c
where c.points > 2000 and c.points <= 3000

union

select 
	c.customer_id,
    c.first_name,
	c.points,
    'Gold' as type
from customers c
where c.points > 3000

order by type

-- order by 需要放在最后
```

# Chapter 4

## Column Attributions

how to insert uodate delete data



- varchar(n): 可变字符,表示最多存储n个字符，不会浪费存储空间
- char(50): 固定字符，如果不足50个就会用空格填充，比较浪费

## Inserting a Single Row



```mysql
INSERT INTO customers
VALUES(
	DEFAULT,
    'azoux',
    'sd2n',
    '2000-11-30',
    NULL,
    'address',
    'city',
    'CA',
    DEFAULT
    )
    
-- 如果这么写的话就不需要default和null了
-- 在上面列出需要的值
-- 这么写可以交换列的顺序
INSERT INTO customers (
	first_name,
    last_name,
    birth_date,
    address,
    city,
    state)
VALUES(
    'azoux',
    'sd2n',
    '2000-11-30',
    'address',
    'city',
    'CA'
    )
```

## Inserting Multiple Rows

```mysql
INSERT INTO shippers (name)
VALUES  ('Shipper1'),
		('Shipper2'),
        ('Shipper2')
        
-- exercise
INSERT INTO products (
	name,
    quantity_in_stock,
    unit_price
    )
VALUES  ('product1', 10, 1.12),
		('Shipper2', 20, 2.2),
        ('Shipper2', 30, 1)
```

## Inserting Hierarchical Rows

如何往多表插入数据

