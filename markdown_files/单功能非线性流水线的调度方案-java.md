---
title: '单功能非线性流水线的调度方案[java]'
date: 2019-03-13 17:13:11
tags: 操作系统
---

# 单功能非线性流水线的调度方案[java]

单功能非线性流水线的调度方案[java]

<!-- more -->

## 一 什么是单功能非线性流水线？##

### 1.预约表###

如下图：

![img](https://github.com/kwm42/markdownPictures/raw/master/assembly_line/reservation_form.png)

共有4个功能段 s1~s4 ，一条指令占用7个时间段。其中某个位置为X表示在该时间段某个功能段被占用，如 t=1 时 S1 段被占用，t=2 时功能段 S2 被占用，以此类推。

### 2.冲突向量###

由该预约表可得到的初始冲突向量是「101010」，某位上为1表示禁止进入的时间间隔，例如 由右向左第二位为1，表示初始向量进入后间隔3个时间间隔不能流入新的指令，否则会产生冲突。

### 3.状态转移图###

状态转移图就是由初始冲突向量经过计算得到新的冲突向量，从而进一步得到状态向量之间的转化，最后得到状态转移图。

由上述预约表可以得到的状态转移图如下：

![img](https://github.com/kwm42/markdownPictures/raw/master/assembly_line/state_transition.png)

以「101010」– 3 –> 「101111」 为例，表示当前冲突向量为「101010」，经过 3 个时间间隔流入一条新的指令，此时将原先的冲突向量右移 3 位，然后和新的指令的禁止冲突向量（这里是「101010」）进行**或**运算，得到的新的冲突向量就是「101111」。

状态转移图用邻接表的方式存储，这个例子得到的邻接表是

{101010(+1)->111111、101010(+3)->101111、101010(+5)->101011、101010(+7)->101010}
{111111(+7)->101010}
{101111(+5)->101011、101111(+7)->101010}
{101011(+3)->101111、101011(+5)->101011、101011(+7)->101010}

### 4.调度方案

由上图可得到的调度有许多种，以下表中的（1,7）这个方案为例，意思就是初始向量「101010」经过 1 个时间间隔流入一条新的指令后得到的新的冲突向量为「111111」，然后间隔 7 个时间间隔再流入新的指令后冲突向量变为「101010」，然后经过 1 个时间间隔再流入新的指令… 重复这个过程，我们可以知道每流入两条指令会需要 1+7 共 8 个时间间隔，所以当指令条数很多时，平均每条指令的等待时间是 4 。

| 调度方案 | 平均延迟 |
| -------- | -------- |
| （1,7）  | 4        |
| （3,5）  | 4        |
| (5,3)    | 4        |
| …        | …        |

\##二 java程序实现流水线最优调度##

\###1. 冲突向量类###

```
/**
 * 冲突向量类，记录状态转移图中的某一个冲突向量状态
 * @author kwm
 *
 */
class ConflictVector{
	int stateNumber;
	/* 冲突向量*/
	int vector;
	/** 冲突向量长度*/
	int length;
	
	/**
	 * 从预约表得到初始冲突向量
	 * @param reservationForm 预约表，1表示占用功能段，0表示不占用
	 */
	ConflictVector(int [][]reservationForm){
		stateNumber=0;
		vector=0;
		length=0;
		int row=reservationForm.length,col=reservationForm[0].length;
		for(int i=0;i<row;++i) {
			for(int j=0;j<col;++j) {
				if(reservationForm[i][j]==1) {
					for(int k=j+1;k<col;++k) {
						//计算禁止的时间间隔
						vector|=(reservationForm[i][k]==1?0x01<<(k-j-1):0);
						//更新向量的长度
						if(reservationForm[i][k]==1&&k-j>length) length=k-j;
					}
				}
			}
		}
	}
	
	/**
	 * 由初始冲突向量得到新的冲突向量
	 * @param timeInterval 经过多少事件间隔又流入一条新的任务
	 * @param originalVector 初始冲突向量
	 * @param currentVector 当前冲突向量
	 */
	ConflictVector(int stateNumber,ConflictVector originalVector,ConflictVector currentVector,int timeInterval){
		this.stateNumber=stateNumber;
		this.length=originalVector.length;
		vector=(currentVector.getVector()>>timeInterval)|originalVector.getVector();
	}
	
	int getVector() {return vector;}
	
	int getLength() {return length;}
	
	int getStateNumber() {return stateNumber;}
	
	void print() {
		for(int i=length-1;i>=0;--i) {
			System.out.print((vector>>i)&0x01);
		}
	}
	
	@Override
	public String toString() {
		String s="";
		for(int i=length-1;i>=0;--i) {
			s+=((vector>>i)&0x01);
		}
		return s;
	}
}
```

### 2.状态转移图类

这个类代码较多，所以只给出重要的代码。

- 1 .根据初始冲突向量得到状态转移图。

  由初始冲突向量计算非禁止的时间间隔，得到下一个状态向量，如果新的状态向量没有出现过，新建一个节点，最开始的时候邻接表中只有一个节点即初始冲突向量「101010」，对每一个节点，都计算出由它可得到的下一状态量，直到得到所有节点和边。

算法描述如下：

- 1 初始化邻接表，加入初始冲突状态量V0
- 2 对表中某一个没有计算过的节点，计算由其出发的所有非禁止时间间隔可得到的下一状态量，如果该状态没有出现，添加一个新状态。
- 3 如果表中所有所有节点都已经完成计算，结束，否则进行第二步。

```
/**
	 * 完成图G，画出状态转移图，邻接表存储
	 */
	void figureG() {
		vectorArray.add(originalVector);
		G.add(new ArrayList<Tuple>());
		int length=originalVector.getLength();
		int currentVector;
		int newVector;
		ConflictVector newConflictVector;
		ConflictVector currentConflictVector;
		
		//计算每个向量的邻接表
		for(int i=0;i<vectorArray.size();++i) {
			currentConflictVector=vectorArray.get(i);
			currentVector=currentConflictVector.getVector();
			for(int k=1;k<=length;++k) {
				//非禁止时间间隔
				if((currentVector>>(k-1)&0x01)==0) {
					newVector=(currentVector>>k)|originalVector.getVector();
					//新向量没有出现过，添加到向量数组
					if(getVectorNumber(newVector)==-1){
						newConflictVector=getNewConflictVector(vectorArray.size(),k,currentConflictVector);
						vectorArray.add(newConflictVector);
						G.add(new ArrayList<Tuple>());
					}
					//添加邻接表
					G.get(i).add(new Tuple(k,getVectorNumber(newVector)));
				}
			}
			//添加恢复到初始向量的时间
			G.get(i).add(new Tuple(length+1,originalVector.getStateNumber()));
		}
	}
```

- 1. 根据状态转移图的邻接表得到所有的调度方案（即在一个有向图中搜索出所有的环）。

     我的思路是利用 **DFS** 遍历图，我这里利用了一个动态数组「record」记录路径，然后找到一条新的回路就记录下来，其中「avilableSchedule」是所有可用的调度方案。「visited」表示某个节点是否被访问过，如果之前被访问过了就表示遇到了环，就记录下来。

```
/**
	 * 搜索出图中所有的环
	 */
	void searchCircle() {
        //visited 表示某个节点是否被访问过
		boolean visited []=new boolean[vectorArray.size()];
		for(boolean b:visited) {b=false;}
        //记录路径
		ArrayList<Tuple> record=new ArrayList<Tuple>();
		record.add(new Tuple(0,0));
		dfs(0,record,visited);
	}
	
	/**
	 * 找出环并且记录路径
	 * @param stateNumber 当前状态向量编号
	 * @param record 路径的记录
	 * @param visited 节点是否被访问过的标志
	 */
	void dfs(int stateNumber,ArrayList<Tuple> record,boolean visited[]) {
		ArrayList<Tuple> al=G.get(stateNumber);
		//节点已经被访问过，即遇到了环
		if(visited[stateNumber]) {
			//记录可行解
			//这个地方要添加一个record的复制，不能直接添加其引用
			avilableSchedule.add(new ArrayList<Tuple>(record));
			return;
		}
		for(Tuple t:al) {
			visited[stateNumber]=true;
			record.add(t);
			dfs(t.getNumber(),record,visited);
			record.remove(record.size()-1);
			visited[stateNumber]=false;
		}
	}
```

- 1. 求出某种策略的实际效率，可以用「吞吐率」或者每条指令的「平均等待时间」来衡量

```
/**
	 * 计算一种调度策略效率
	 * @param plan 某种调度策略
	 */
	double figureThroughputRate(ArrayList<Tuple> plan) {
		int circleStart=0,circleEnd=0,circleTime=0;
		//找出环的开始和结束位置,数量很小，直接遍历
		for(int i=0;i<plan.size();++i) {
			for(int j=i+1;j<plan.size();++j) {
				if(plan.get(i).stateNumber==plan.get(j).stateNumber) {
					circleStart=i;
					circleEnd=j;
					break;
				}
			}
		}
		int repeatCount=circleEnd-circleStart;
		//计算一个循环的时间
		for(int i=circleStart+1;i<=circleEnd;++i) {
			circleTime+=plan.get(i).timeInterval;
		}
		System.out.print("当流入k条指令的时候，一条指令平均等待时间是");
		
		//平均等待时间=[C+(k-d)*T/i]/k    T=(t1+t2+...ti)
		//k-d为循环状态个数，T/i为循环总时间/循环指令条数，C为循环之外的常数时间
		String C="",T="";
		if(circleStart!=0){
			for(int i=1;i<=circleStart;++i) {
				C+=plan.get(i).timeInterval+"+";
			}
		}
		for(int i=circleStart+1;i<=circleEnd;++i) {
			if(i==circleStart+1) T+=plan.get(i).timeInterval;
			else               T+="+"+plan.get(i).timeInterval;
		}
		System.out.println("["+C+"(k-"+circleStart+")*"+"("+T+")"+"/"+repeatCount+"]/k");
		System.out.println("当k趋近无穷大时，每条指令平均等待时间是"+(double)circleTime/repeatCount);
		return (double)circleTime/repeatCount;
	}
```

\###流水线类###

 它的功能就是读取预约表的内容，然后调用状态转移图的方法得到最优调度方案，比较简单。

```
/**
 * 流水线类，包含预约表，冲突向量的状态转移图
 * @author kwm
 *
 */
public class AssemblyLine {
	/* 预约表，1表示占用，0表示不占用*/
	int [][] reservationForm;
	/** 状态转移图 */
	StateTransition stateTransition;
	
	/**
	 * 初始化预约表，计算出流水线状态转移图
	 */
	AssemblyLine(){
		readReservationForm();
		stateTransition=new StateTransition(reservationForm);
	}
	
	StateTransition getStateTransition() {return stateTransition;}
	
	void printReservationForm() {
		System.out.println("预约表如下:");
		for(int i=0;i<reservationForm.length;++i) {
			for(int j=0;j<reservationForm[i].length;++j) {
				System.out.print(reservationForm[i][j]+" ");
			}
			System.out.println("");
		}
	}
	
	void printStateTransition() {
		stateTransition.printG();
	}
	
	void printSchedulePlan() {
		stateTransition.printSchedulePlan();
	}
	
	/**
	 * 从键盘读取预约表，
	 */
	void readReservationForm() {
		int col,raw;
		System.out.print("请输入预约表的功能段数（行数）和指令周期（列数）：");
		try {
			Scanner sc=new Scanner(System.in);
			raw=sc.nextInt();
			col=sc.nextInt();
			System.out.println("请输入预约表：");
			reservationForm=new int[raw][col];
			for(int i=0;i<raw;++i) {
				for(int j=0;j<col;++j) {
					reservationForm[i][j]=sc.nextInt();
				}
			}
		}
		catch(Exception e) {
		}
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		AssemblyLine al=new AssemblyLine();
		al.printReservationForm();
		al.printStateTransition();
		al.stateTransition.searchCircle();
		al.printSchedulePlan();
	}
}
```