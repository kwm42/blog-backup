---
title: spring-boot问题记录
date: 2019-12-18 17:12:22
tags:
---

# spring-boot 问题

2018-12-18

# 常见问题



### 数据库

- mysql 连接时出现 ‘The server time zone value ‘ÖÐ¹ú±ê×¼Ê±¼ä’ is unrecognized or represents more than one time zone’，怎么办？
- 看描述就知道是时区的问题，需要再数据库连接字符串后加上 ‘?serverTimezone=GMT%2B8’

- spring-boot 启动时报错 ‘Field XXX in XX.XX required a bean of type’ , Consider defining a bean of type ‘XXX.XXX.XXX’ in your configuration.
- 可能是对应的 Service 包没有添加@Service注释，或者 spring 没有扫描到对应的包，参考[这篇文章](https://blog.csdn.net/cutterwolf/article/details/77862652)

