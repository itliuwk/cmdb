let Mock = require('mockjs')
let { data } = Mock.mock({
  'data|3-10': [{
    'id': '@id',
    'number|+1': 1,
    'clusterName|2': '',
    'type': '@pick(["应用集群","WebServer集群","中间件集群","数据库集群"])',
    'hav': '@pick(["是","否"])',
    'over': '@pick(["是","否"])',
    'way': '@pick(["RAC","weblogic","websphere","F5","A10"])',
    'mode': '@pick(["主备","双活"])',
    'port|1000-9999': 1000,
    'sysName': '@pick(["OA","schss系统","cmdb系统"])',
    'classification': '@pick(["L1","L2","L3","L4"])',
    'middleware': '@pick(["tomcat","jboss", "weblogic", "websphere"])',
    'window': '@pick(["OA","SHCSS", "CMDB"])',
    'headOfDevelopment': '@name',
    'headOfMaintenance': '@cname',
    'headOfTest': '@cname',
    'downtime|1-60': 24,
    'department': '@pick(["研发部","市场部","产品部"])',
    'databaseInstance': '@pick(["sqlplus","Oracle","Microsoft&reg"])',
    'application': '@pick(["HTTP","RPC","SDP"])',
    'virtual': '@pick(["阿里云","GoDaddy","腾讯云"])',
    'physical': '@pick(["戴尔","小米","联想"])',
    'interfaceName': '@pick(["中间件集群","应用系统","机柜"])',
    'interfaceMethod': '@pick(["POST","GET","PUT"])',
    'peerInformation': '@pick(["SCHSS数据集合","OA数据集合","CMDB数据集合"])',
    'version': '@pick(["7.0.105","10.0.0-M8","10.3.7"])',
    'patch': '@pick(["Patch 26519417","Patch 219417","Patch 19417"])',
    'cluster': '@pick(["创建集群","性能保障集群","组建集群选型推荐"])',
    'server': '@pick(["Apache 服务器","Nginx 服务器","Tomcat 服务器"])',
    'serverType': '@pick(["轻量级","重量级","轻中量级"])',
    'dataName': '@pick(["shccs_cloud","shccs_boot","shccs_test"])',
    'dataInstanceName': '@pick(["shccsCloud_id","shccsBoot_name","shccsTest_type"])',
    'range': '@pick(["100-1000","788-9090","12-899"])',
    'instanceName': '@pick(["mySql","PostgreSQL"])',
    'dataType': '@pick(["网状数据库","关系数据库","树状数据库","面向对象数据库"])',
    'equipment': '@pick(["工作组级服务器","部门级服务器","企业级服务器"])',
    'equipmentType': '@pick(["ST58","TS250","TS80x"])',
    'cpu|1-5': 1,
    'cpuType': '@pick(["英特尔","AMD"])',
    'cpuType1': '@pick(["i7","i5","AMD10"])',
    'mainFrequency': '@pick(["2.9GHz","3.0GHz","4.0GHz"])',
    'ram': '@pick(["4G","8G","12G"])',
    'gb': '@pick(["6G","32G","12G"])',
    'ramCount': '@pick(["2","3","5"])',
    'card': '@pick(["以太网卡","FC 网卡","ISCSI 网卡"])',
    'power': '@pick(["220w","260w","330w"])',
    'kwPower': '@pick(["220kw","260kw","330kw"])',
    'cabinet': '@pick(["IBM ","威龙VERO","图腾 "])',
    'sync': '@pick(["同步 ","不同步"])',
    'status': '@pick(["故障 ","正常","错误"])',
    'password': '@pick(["12345 ","346733","6666666"])',
    'bit': '@pick(["RFID无线传输方式 ","电路连接传输方式","改进型RFID方式"])',
    'attributes': '@pick(["window ","mac","linux"])',
    'numbering': '@pick(["JP-4 ","SB-3","JP-1"])',
    'host': '@pick(["DAW-PC ","DAW-PHONE","DAW-ANDROID"])',
    'node': '@pick(["Auto-Detect ","Auto-Switch","Auto-Recovery"])',
    'setting': '@pick(["基于主机的虚拟存储 ","基于存储设备的虚拟化","基于网络的虚拟存储"])',
    'logic': '@pick(["集合结构 ","线性结构","树形结构"])',
    'note': '@pick(["针对于schss系统 ","针对于oa系统","针对于cmdb系统"])',
    'poolType': '@pick(["中值池化","组合池化","Spatial Pyramid Pooling"])',
    'types': '@pick(["垂直集群","水平集群","负载均衡集群","高性能计算集群"])',
    'cpuNumbers|3-10': 10,
    'regexp|1-5': '/\\d{5,10}\\-/',
    'numbers': '@integer(10000)',
    'ipTypes': '@pick(["EMC存储","IBM DS4700","IBM v5030","IBM v7000"])',
    'uHeight': '@pick(["1080","2048ti","4770K","4810mq"])',
    'room': '@pick(["香港电讯盈科","香港新世界","香港电讯","香港第一线"])',
    'rated': '@pick(["10兆","20兆","30兆","40兆"])',
    'a': '@pick(["100-300V","100-240V","100-250V","100-200V"])',
    'backup': '@pick(["定时备份","自动备份","手动备份"])',
    'physicalLibrary': '@pick(["磁带库","多通道带库","单通道带库"])',
    'virtualLibrary': '@pick(["legato","NetStor"])',
    'code': '@pick(["DRV201610260000","DRV20200260000","DRV201910260000"])',
    'opticalFiber': '@pick(["点到点拓扑","交换结构拓扑","环状拓扑"])',
    'zone': '@pick(["zone1","zone2","zone3"])',
    'lun': '@pick(["磁带机","SCSI打印机","SCSI复印机"])',
    'fiberPort': '@pick(["SC","ST","FC"])',
    'portName': '@pick(["单模","多模"])',
    'router': '@pick(["水星","小米","TP"])',
    'routerType': '@pick(["WDR7660","D191G","AX3 PRO"])',
    'mask': '@pick(["255.0.0.0","255.255.0.0","255.255.255.0"])',
    'vlan': '@pick(["访问链接","汇聚链接","静态 VLAN"])',
    'areaName': '@pick(["物理隔离","逻辑隔离"])',
    'area': '@pick(["防火墙控制","VLAN虚拟网技术","FR, ATM技术"])',
    'fireName': '@pick(["过滤防火墙","应用网关防火墙","服务防火墙"])',
    'fireType': '@pick(["H3c","F100-G2","TP-LINK"])',
    'safety': '@pick(["域间安全策略","域内安全策略","接口包过滤"])',
    'balanced': '@pick(["软/硬件负载均衡","本地/全局负载均衡","接口包过滤"])',
    'loadBalancing': '@pick(["轮询法","随机法","最小连接法"])',
    'loadName': '@pick(["轮询","weight","ip_hash","fair"])',
    'loadType': '@pick(["HTTP 重定向负载均衡","DNS 域名解析负载均衡","反向代理负载均衡","网络层负载均衡"])',
    'loadChoose': '@pick(["链路负载均衡","服务器负载均衡"])',
    'portType': '@pick(["TCP 端口","UDP 端口","IP 端口"])',
    'cabinetName': '@pick(["FP网门系列机柜","FS玻璃门系列机柜","A2机柜"])',
    'cabinetType': '@pick(["网络服务器机柜","壁挂式机柜"])',
    'pdu': '@pick(["16 孔","24 孔","36 孔"])',
    'city|2-4': {
      '110000': '北京市',
      '120000': '天津市',
      '130000': '河北省',
      '140000': '山西省'
    },
    'guid|17382-99999': 17382,
    //属性 title 是一个随机长度的标题
    'title': '@title()',
    //属性 address 是一个随机地址
    'address': '@county(true)',
    //属性 date 是一个yyyy-MM-dd 的随机日期
    'date': '@date("yyyy-MM-dd")',
    'dateEnd': '@date("yyyy-MM-dd")',
    //属性 time 是一个 size, background, text 的随机时间
    'time': '@time("HH:mm:ss")',
    //属性 url 是一个随机的url
    'url': '@url',
    //属性 email 是一个随机email
    'email': '@email',
    //属性 ip 是一个随机ip
    'ip': '@ip',
    //属性 regexp 是一个正则表达式匹配到的值 如aA1
    'regexp': /[a-z][A-Z][0-9]/
  }]
})
export default data