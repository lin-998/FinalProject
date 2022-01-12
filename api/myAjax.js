import { apiUrl,wwwUrl} from "./app.js";

import { http } from "./request.js";

const header = { "Content-Type": "application/x-www-form-urlencoded" };
class Login {
  constructor() {
		this.getVersionManageApi = apiUrl + 'system/api/commonVersionManage/getVersionManage';//获取最新版本
		this.getPatchManageApi = apiUrl + 'system/api/commonPatchManage/getPatchManage';//获取最新补丁
		this.getCommonSetUpApi = apiUrl + 'system/api/commonSetUp/getCommonSetUp';//获取系统设置
		
		//Login
    this.registeredUserApi = apiUrl + "user/api/login/registeredUser"; //注册
    this.getPublicKeyApi = apiUrl + "user/api/login/getPublicKey"; //获取公钥
    this.loginApi = apiUrl + "user/api/login/login"; //登录
    this.forgetPasswordApi = apiUrl + "user/api/login/forgetPasswordUsingUsername"; //忘记密码
    this.checkCodeApi = apiUrl + "user/api/login/checkCode"; //校验图形验证码
    this.getUserIdByUserNameApi = apiUrl + "user/api/inner/user/getUserIdByUserName"; //根据用户名获取用户id
    this.forgetPasswordSendsmsApi = apiUrl + "user/api/send/forgetPasswordSendsms"; //获取忘记密码验证码
    this.checkTradePasswordApi = apiUrl + "user/api/user/checkTradePassword"; //获取忘记密码验证码
		this.registerSendSmsApi = apiUrl + "user/api/send/registerSendSms"; //获取注册验证码
    this.getCommonProtocolTextApi = apiUrl + "system/api/commonProtocolText/getCommonProtocolText"; //注册协议

  }
	//获取注册验证码
	registerSendSms(params){
		return http.get(this.registerSendSmsApi,{params}).then((res) => res.data);
	}
	//获取系统设置
	getCommonSetUp(params){
		return http.get(this.getCommonSetUpApi,{params}).then((res) => res.data);
	}
	//获取忘记密码验证码
	getCommonProtocolText(params){
		return http.get(this.getCommonProtocolTextApi,{params}).then((res) => res.data);
	}
	//获取最新补丁
	getPatchManage(params){
		return http.get(this.getPatchManageApi,{params}).then((res) => res.data);
	}
	//获取最新版本
	getVersionManage(params){
		return http.get(this.getVersionManageApi,{params}).then((res) => res.data);
	}
	//获取忘记密码验证码
	checkTradePassword(params){
		return http.get(this.checkTradePasswordApi,{params}).then((res) => res.data);
	}
	//获取忘记密码验证码
	forgetPasswordSendsms(params){
		return http.get(this.forgetPasswordSendsmsApi,{params}).then((res) => res.data);
	}
	//根据用户名获取用户id
	getUserIdByUserName(data){
		return http.post(this.getUserIdByUserNameApi, data,{header}).then((res) => res.data);
	}
	//校验图形验证码
	checkCode(params){
		return http.get(this.checkCodeApi, {params}).then((res) => res.data);
	}
	//忘记密码
	forgetPassword(data){
		return http.post(this.forgetPasswordApi, data,{header}).then((res) => res.data);
	}
	//登录
	login(data){
		return http.post(this.loginApi, data,{header}).then((res) => res.data);
	}
	//获取公钥
	getPublicKey(params){
		return http.get(this.getPublicKeyApi, {params}).then((res) => res.data);
	}
	//注册
	registeredUser(data){
		return http.post(this.registeredUserApi, data).then((res) => res.data);
	}
}

class Mine {
  constructor() {
    this.getInvitationQRCodeApi = apiUrl + "user/api/user/getInvitationQRCode"; //获取邀请码
    this.updateLoginPwdApi = apiUrl + "user/api/user/updateLoginPassword"; //修改登录密码
    this.LoginPwdSmsApi = apiUrl + "user/api/send/modifyLoginPasswordSendSms"; //修改登录密码验证码
    this.updateTradePwdApi = apiUrl + "user/api/user/updateTradePassword"; //修改交易密码
    this.TradePwdSmsApi = apiUrl + "user/api/send/modifyTradePasswordSendSms"; //修改交易密码验证码
    this.userDetailApi = apiUrl + "user/api/user/detail"; //获取用户信息
    this.editUserInfoApi = apiUrl + "user/api/user/editUserInfo"; //修改个人资料
    this.modifyPhoneApi = apiUrl + "user/api/login/modifyPhone"; //修改、添加手机号码
    this.modifySendSmsApi = apiUrl + "user/api/send/modifySendSms"; //获取更换手机号码验证码
    this.getUserCommunityApi = apiUrl + "user/api/userCommunity/getUserCommunityData"; //获取用户的社区数据
    this.buyActiveCodeApi = apiUrl + "user/api/userActiveCode/buyActiveCode"; //购买用户的激活码
    this.getActiveCodeApi = apiUrl + "user/api/userActiveCode/getActiveCode"; //获取用户的激活码
    this.sendWithdrawSmsApi = apiUrl + "user/api/send/sendWithdrawSms"; //资产提币验证码
		this.sendInsideTransferSmsApi = apiUrl + "user/api/send/sendInsideTransferSms"; //资产互转验证码
		this.getBuyRankApi = apiUrl + "user/api/userRank/getBuyRank"; //获取用户可付费等级
		this.buyRankApi = apiUrl + "user/api/userRank/buyRank"; //付费等级
		
    this.withdrawDepositApi = apiUrl + "tron/api/wallet/withdrawDeposit"; //资产提币
    this.insideTransferApi = apiUrl + "tron/api/wallet/insideTransfer"; //资产互转
		this.getTransactionRecordApi = apiUrl + "tron/api/wallet/getTransactionRecord"; //获取当前用户交易记录
		
		

  }
	//获取用户可付费等级
	buyRank(data){
		return http.post(this.buyRankApi, data,{header}).then((res) => res.data);
	}
	//获取用户可付费等级
	getBuyRank(params){
		return http.get(this.getBuyRankApi, {params}).then((res) => res.data);
	}
	//获取当前用户交易记录
	getTransactionRecord(params){
		return http.get(this.getTransactionRecordApi, {params}).then((res) => res.data);
	}
	//资产提币验证码
	sendWithdrawSms(data){
		return http.get(this.sendWithdrawSmsApi, data,{header}).then((res) => res.data);
	}
	//资产互转验证码
	sendInsideTransferSms(data){
		return http.get(this.sendInsideTransferSmsApi, data,{header}).then((res) => res.data);
	}
	//资产互转
	insideTransfer(data){
		return http.post(this.insideTransferApi, data,{header}).then((res) => res.data);
	}
	//资产提币
	withdrawDeposit(data){
		return http.post(this.withdrawDepositApi, data,{header}).then((res) => res.data);
	}
	//获取用户的激活码
	getActiveCode(params){
		return http.get(this.getActiveCodeApi, {params}).then((res) => res.data);
	}
	//购买用户的激活码
	buyActiveCode(data){
		return http.post(this.buyActiveCodeApi, data,{header}).then((res) => res.data);
	}
	//获取用户的社区数据
	getUserCommunity(params){
		return http.get(this.getUserCommunityApi, {params}).then((res) => res.data);
	}
	//修改登录密码验证码
	LoginPwdSms(params){
		return http.get(this.LoginPwdSmsApi, {params}).then((res) => res.data);
	}
	//修改交易密码验证码
	TradePwdSms(params){
		return http.get(this.TradePwdSmsApi, {params}).then((res) => res.data);
	}
	//获取更换手机号码验证码
	modifySendSms(params){
		return http.get(this.modifySendSmsApi, {params}).then((res) => res.data);
	}
	//修改、添加手机号码
	modifyPhone(data){
		return http.post(this.modifyPhoneApi, data,{header}).then((res) => res.data);
	}
	//修改个人资料
	editUserInfo(data){
		return http.post(this.editUserInfoApi, data).then((res) => res.data);
	}
	//获取用户信息
	userDetail(params){
		return http.get(this.userDetailApi, {params}).then((res) => res.data);
	}
	//修改交易密码
	updateTradePwd(data){
		return http.post(this.updateTradePwdApi, data,{header}).then((res) => res.data);
	}
	//修改登录密码
	updateLoginPwd(data){
		return http.post(this.updateLoginPwdApi, data,{header}).then((res) => res.data);
	}
	//获取邀请码
	getInvitationQRCode(params){
		return http.get(this.getInvitationQRCodeApi, {params}).then((res) => res.data);
	}
}

class Home {
  constructor() {
		this.getUserHouBiApi = apiUrl + "user/api/userApi/getUserHouBiApi"; //用户查看个人的火币API
		this.delUserHouBiApi = apiUrl + "user/api/userApi/delUserHouBiApi"; //用户删除火币API
		this.addOrUpdateUserHouBiApi = apiUrl + "user/api/userApi/addOrUpdateUserHouBiApi"; //用户添加或者修改的火币API
		this.getTutorialsApi = apiUrl + "user/api/commonAuthorizeTutorials/getCommonAuthorizeTutorials"; //获取API授权教程
    this.getQuoteCurrencyApi = apiUrl + "currency/api/market/getTopList"; //获取首页行情币种
    this.getHomeListApi = apiUrl + "currency/api/market/getHomeList"; //获取首页总交易对
    this.getShufflingFigureApi = apiUrl + "system/api/shufflingFigure/getShufflingFigure"; //获取首页轮播图
    this.getNoticeApi = apiUrl + "system/api/commonAnnouncement/searchCommonAnnouncement"; //获取公告
    this.getNoticeInfoApi = apiUrl + "system/api/commonAnnouncement/getCommonAnnouncement"; //获取公告详情
		this.getProfitDataApi = apiUrl + "quantized/api/tradingOn/getProfitData"; //电子账单:获取用户盈利数据
		this.getProfitStatementApi = apiUrl + "quantized/api/tradingOn/getProfitStatement"; //电子账单:获取订单明细
		this.getTotalProfitRecordApi = apiUrl + "quantized/api/tradingOn/getTotalProfitRecord"; //累计盈利
		this.getProfitYieldApi = apiUrl + "quantized/api/tradingOn/getProfitYield"; //海报：今日收益率
		
  }
	//海报：今日收益率
	getProfitYield(params={}){
		return http.get(this.getProfitYieldApi, {params}).then((res) => res.data);
	}
	//累计盈利
	getTotalProfitRecord(params={}){
		return http.get(this.getTotalProfitRecordApi, {params}).then((res) => res.data);
	}
	//电子账单:获取订单明细
	getProfitStatement(params={}){
		return http.get(this.getProfitStatementApi, {params}).then((res) => res.data);
	}
	//电子账单:获取用户盈利数据
	getProfitData(params={}){
		return http.get(this.getProfitDataApi, {params}).then((res) => res.data);
	}
	//获取公告详情
	getNoticeInfo(params={}){
		return http.get(this.getNoticeInfoApi, {params}).then((res) => res.data);
	}
	//获取公告
	getNotice(params={}){
		return http.get(this.getNoticeApi, {params}).then((res) => res.data);
	}
	//获取首页轮播图
	getShufflingFigure(params={}){
		return http.get(this.getShufflingFigureApi, {params}).then((res) => res.data);
	}
	//获取首页总交易对
	getHomeList(params={}){
		return http.get(this.getHomeListApi, {params}).then((res) => res.data);
	}
	//获取API授权教程
	getTutorials(params={}){
		return http.get(this.getTutorialsApi, {params}).then((res) => res.data);
	}
	//用户添加或者修改的火币API
	addOrUpdateUserHouBi(data={}){
		return http.post(this.addOrUpdateUserHouBiApi, data).then((res) => res.data);
	}
	//用户删除火币API
	delUserHouBi(params={}){
		return http.get(this.delUserHouBiApi, {params}).then((res) => res.data);
	}
	//用户查看个人的火币API
	getUserHouBi(params={}){
		return http.get(this.getUserHouBiApi, {params}).then((res) => res.data);
	}
	//获取首页行情币种
	getQuote(params={}){
		return http.get(this.getQuoteCurrencyApi, {params}).then((res) => res.data);
	}
}
//资讯
class Consult {
  constructor() {
    this.searchmationApi = apiUrl + "system/api/commonInformation/searchCommonInformation"; //分页查询资讯
    this.getmationInfoApi = apiUrl + "system/api/commonInformation/getCommonInformation"; //资讯详情
    this.getMonthProfitTopApi = apiUrl + "trade/api/transactionBill/getMonthProfitTop20"; //本月排行榜
    this.getTodayProfitTopApi = apiUrl + "trade/api/transactionBill/getTodayProfitTop20"; //今日排行榜
		
		  this.heplpListApi = apiUrl + "system/api/helpCenter/list"; //分页查询帮助中心
		  this.heplpDetailApi = apiUrl + "system/api/helpCenter/get"; //帮助中心详情
		
  }
	
	//帮助中心详情
	heplpDetail(params={}){
		return http.get(this.heplpDetailApi, {params}).then((res) => res.data);
	}
	//分页查询帮助中心
	heplpList(params={}){
		return http.get(this.heplpListApi, {params}).then((res) => res.data);
	}
	//本月排行榜
	getMonthProfitTop(data){
		return http.post(this.getMonthProfitTopApi, data,{header}).then((res) => res.data);
	}
	//今日排行榜
	getTodayProfitTop(data){
		return http.post(this.getTodayProfitTopApi, data,{header}).then((res) => res.data);
	}
	//资讯详情
	getmationInfo(params={}){
		return http.get(this.getmationInfoApi, {params}).then((res) => res.data);
	}
	//分页查询资讯
	searchmation(params={}){
		return http.get(this.searchmationApi, {params}).then((res) => res.data);
	}
}
//日志
class Record {
  constructor() {
    // this.getTradeLogApi = apiUrl + "order/api/journal/getTradeLog"; //电子账单:获取用户盈利数据
    this.getTradeLogApi = apiUrl + "okex/api/journal/getTradeLog"; //电子账单:获取用户盈利数据
  }
	//获取首页行情币种
	getTradeLog(params={},data){
		console.log(data);
		return http.get(this.getTradeLogApi, {params},data).then((res) => res.data);
	}
}
//交易
class Trading {
  constructor() {
    this.getFreeBalanceOkeyApi = apiUrl + "trade/api/userTransactionWallet/getFreeBalance"; //获取可用余额（okey）
    this.getFreeBalanceApi = apiUrl + "trade/api/userTransactionWallet/getFreeBalanceById"; //获取可用余额（USDT）
    // this.startTradingStartApi = apiUrl + "trade/api/start/startTradingStart"; //交易启动
    this.startTradingStartApi = apiUrl + "trade/api/contract/start/startTradingContract"; //交易启动
		
    this.TradeCoinSetApi = apiUrl + "trade/api/userTransactionStrategy/queryUserTradeCoinSetting"; //查看币种的交易配置
    this.UserTradeCoinApi = apiUrl + "trade/api/userTransactionStrategy/queryUserTradeCoinSetting"; //查看自己的币种的交易配置
    this.addTradeCoinApi = apiUrl + "trade/api/userTransactionStrategy/updateOrAddUserTradeCoin"; //更新新增个人币种交易设置
    // this.queryUserPositionApi = apiUrl + "trade/api/start/queryPositionSet"; //查询个人交易币对的持仓和设置
    this.queryUserPositionApi = apiUrl + "trade/api/contract/start/queryPositionSet"; //查询个人交易币对的持仓和设置
    this.getTradeCoinListApi = apiUrl + "trade/api/tradeCoin/getTradeCoinList"; //获取用户交易对
    this.updateStrategyModeApi = apiUrl + "trade/api/userTransactionStrategy/updateStrategyMode"; //修改币种交易设置模式
    this.updateAllStrategyModeApi = apiUrl + "trade/api/userTransactionStrategy/updateAllStrategyMode"; //批量交易循环设置或者单次
    this.updateOrAddUserTradeCoinAllApi = apiUrl + "trade/api/userTransactionStrategy/updateOrAddUserTradeCoinAll"; //批量更新币对或者批量插入
    this.saleOneApi = apiUrl + "trade/api/VolumeSet/saleOne"; //批量清仓卖出
    this.saleAllApi = apiUrl + "trade/api/VolumeSet/saleAll"; //批量清仓卖出
    this.updateFlagStartApi = apiUrl + "trade/api/userTransactionStrategy/updateFlagStart"; //开始、停止补单
    // this.getTradeRecordApi = apiUrl + "quantized/api/tradeRecord/getTradeRecord"; //搜索交易币对记录
    this.getTradeRecordApi = apiUrl + "okex/api/journal/getTradeLog"; //搜索交易币对记录
    this.getWalletAssetsdApi = apiUrl + "quantized/api/tradingOn/getWalletAssets"; //获取火币账户资产USDT
		this.oneTradeSupplementApi = apiUrl + "trade/api/start/oneTradeSupplement";//一键补单
		this.addPositionApi = apiUrl + "trade/api/userDealInfo/addPosition";//手动补仓
	
		//新增
		this.getCoinApi = apiUrl + "backtest/api/backtest/getCoin";//查询可回测币对
		this.startApi = apiUrl + "backtest/api/backtest/start";//回测开始
		this.getMyBackTestResultApi = apiUrl + "backtest/api/backtest/getMyBackTestResult";//查询我的模拟结果
		// this.getTradeCoinApi = apiUrl + "/trade/api/tradeCoin/getTradeCoin";//获取交易币对
		
		//EMA策略
		this.getUserStrategyApi = apiUrl + "ema/api/strategy/getUserStrategy"; //获取用户EMA策略
		this.setUserStrategyApi = apiUrl + "ema/api/strategy/setUserStrategy"; //设置用户EMA策略
		this.setUserStrategyBatchApi = apiUrl + "ema/api/strategy/setUserStrategyBatch"; //批量设置用户EMA策略
		this.stopUserStrategyApi = apiUrl + "ema/api/strategy/stopUserStrategy"; //EMA策略开始停止
		this.stopUserStrategyBatchApi = apiUrl + "ema/api/strategy/stopUserStrategyBatch"; 	//EMA批量卖出
		this.emaStartApi = apiUrl + "backtest/api/backtest/emaStart"; //EMA模拟
		this.getPositionValueApi = apiUrl + "trade/api/contract/start/getPositionValue"; //当前策略持仓总额度(价值)
	
		this.getGridStrategyApi = apiUrl + "trade/api/gridStrategy/getUserStrategy";//获取网格策略配置
	this.setGridStrategyApi = apiUrl + "trade/api/gridStrategy/setUserStrategy";//设置用户网格策略配置
	
	this.setGridStrategyBatchApi = apiUrl + "trade/api/gridStrategy/setUserStrategyBatch";//批量设置用户的网格策略配置
	this.getStopProfitStrategyApi = apiUrl + "trade/api/stopProfitStrategy/getUserStrategy";//获取尾单止盈策略配置控制层
	this.setStopProfitStrategyApi = apiUrl + "trade/api/stopProfitStrategy/setUserStrategy";//设置尾单止盈策略配置控制层
	this.setStopProfitStrategyBatchApi = apiUrl + "trade/api/stopProfitStrategy/setUserStrategyBatch";//设置尾单止盈策略配置(批量)
	
	this.startGridOrderApi = apiUrl + "trade/api/contract/start/gridOrder";//启动首单交易-合约(网格策略)
	this.startLastStopLastOrderApi = apiUrl + "trade/api/contract/start/lastStopLastOrder";//启动首单交易-合约(尾单止盈)
	this.gridStartApi = apiUrl + "backtest/api/backtest/gridStart";//网格回测开始
	this.stopProfitStrategyDefaultApi = apiUrl + "trade/api/stopProfitStrategy/getStrategyDefault";//获取默认尾单止盈策略配置控制层
	
	this.singleStartApi = apiUrl + "backtest/api/backtest/singleStart";//尾单止盈回测开始
	
	
	

	}
	//尾单止盈回测开始
	singleStart(data,period){
		return http.post(this.singleStartApi+'?period='+period, data).then((res) => res.data);
	}
	//获取默认尾单止盈策略配置控制层
	stopProfitStrategyDefault(){
			return http.get(this.stopProfitStrategyDefaultApi, ).then((res) => res.data);
	}
	//网格回测开始
	gridStart(data,period){
		return http.post(this.gridStartApi+'?period='+period, data).then((res) => res.data);
	}
	//启动首单交易-合约(网格策略)
	startGridOrder(params){
		return http.post(this.startGridOrderApi, "",{params}).then((res) => res.data);
	}
	//启动首单交易-合约(尾单止盈)
	startLastStopLastOrder(params){
		return http.post(this.startLastStopLastOrderApi, "",{params}).then((res) => res.data);
	}
	//获取尾单止盈策略配置控制层
	getStopProfitStrategy(params){
		return http.get(this.getStopProfitStrategyApi,{params}).then((res) => res.data);
	}
	//设置尾单止盈策略配置控制层
	setStopProfitStrategy(data){
		return http.post(this.setStopProfitStrategyApi,data).then((res) => res.data);
	}
	//批量设置尾单止盈策略配置控制层
	setStopProfitStrategyBatch(data){
		return http.post(this.setStopProfitStrategyBatchApi,data).then((res) => res.data);
	}
	//设置用户网格策略配置
	setGridStrategy(data){
		return http.post(this.setGridStrategyApi,data).then((res) => res.data);
	}
	//批量设置用户网格策略配置
	setGridStrategyBatch(data){
		return http.post(this.setGridStrategyBatchApi,data).then((res) => res.data);
	}
	//获取网格策略配置
	getGridStrategy(params){
		return http.get(this.getGridStrategyApi,{params}).then((res) => res.data);
	}
	
	//当前策略持仓总额度(价值)
	getPositionValue(params){
		return http.post(this.getPositionValueApi,"",{params}).then((res) => res.data);
	}
	//手动补仓
	addPosition(params){
		return http.post(this.addPositionApi,"",{params}).then((res) => res.data);
	}
	//EMA批量卖出
	stopUserStrategyBatch(params){
		return http.post(this.stopUserStrategyBatchApi,"",{params}).then((res) => res.data);
	}
	//EMA策略开始停止
	stopUserStrategy(params){
		return http.post(this.stopUserStrategyApi,"",{params}).then((res) => res.data);
	}
	//设置用户EMA策略
	setUserStrat(params){
		return http.post(this.setUserStrategyApi,"",{params}).then((res) => res.data);
	}
	//批量设置用户EMA策略
	setUserStrategyBatch(params){
		return http.post(this.setUserStrategyBatchApi,"",{params}).then((res) => res.data);
	}
	//获取用户EMA策略
	getUserStrategy(params){
		return http.get(this.getUserStrategyApi,{params}).then((res) => res.data);
	}
	//查询我的模拟结果
	getMyBackTestResult(){
		return http.get(this.getMyBackTestResultApi).then((res) => res.data);
	}
	//EMA模拟
	emaStart(data,period){
		return http.post(this.emaStartApi+'?period='+period, data).then((res) => res.data);
	}
	//回测开始
	start(data,period){
		return http.post(this.startApi+'?period='+period, data).then((res) => res.data);
	}
	//查询可回测币对
	getCoin(){
		return http.get(this.getCoinApi).then((res) => res.data);
	}
	//-----
	//一键补单
	oneTradeSupplement(data){
		return http.post(this.oneTradeSupplementApi, data,{header}).then((res) => res.data);
	}
	//获取火币账户资产USDT
	getWalletAssetsd(params={}){
		return http.get(this.getWalletAssetsdApi, {params}).then((res) => res.data);
	}
	//搜索交易币对记录
	getTradeRecord(params,data){
		return http.post(this.getTradeRecordApi, data,{params}).then((res) => res.data);
	}
	//开始、停止补单
	updateFlagStart(data){
		return http.post(this.updateFlagStartApi, data,{header}).then((res) => res.data);
	}
	//批量清仓卖出
	saleOne(params){
		return http.post(this.saleOneApi, '',{params}).then((res) => res.data);
	}
	//批量清仓卖出
	saleAll(data){
		return http.post(this.saleAllApi, data,{header}).then((res) => res.data);
	}
	//批量更新币对或者批量插入
	updateOrAddUserTradeCoinAll(data){
		return http.post(this.updateOrAddUserTradeCoinAllApi, data).then((res) => res.data);
	}
	//批量交易循环设置或者单次
	updateAllStrategyMode(data){
		return http.post(this.updateAllStrategyModeApi, data).then((res) => res.data);
	}
	//修改币种交易设置模式
	updateStrategyMode(data){
		console.log(data);
		return http.post(this.updateStrategyModeApi, data,{header}).then((res) => res.data);
	}
	//获取用户交易对
	getTradeCoinList(params={}){
		return http.get(this.getTradeCoinListApi, {params}).then((res) => res.data);
	}
	//查询个人交易币对的持仓和设置
	queryUserPosition(data){
		return http.post(this.queryUserPositionApi, data,{header}).then((res) => res.data);
	}
	//更新或者新增个人币种交易设置
	addTradeCoin(data){
		return http.post(this.addTradeCoinApi, data).then((res) => res.data);
	}
	//查看自己的币种的交易配置
	UserTradeCoin(data){
		return http.post(this.UserTradeCoinApi, data,{header}).then((res) => res.data);
	}
	//查看币种的交易配置
	TradeCoinSet(data){
		return http.post(this.TradeCoinSetApi, data).then((res) => res.data);
	}
	//交易启动
	startTradingStart(data){
		return http.post(this.startTradingStartApi, data,{header}).then((res) => res.data);
	}
	//获取可用余额
	getFreeBalance(params={}){
		return http.get(this.getFreeBalanceApi, {params}).then((res) => res.data);
	}
	
	getFreeBalanceOkey(params={}){
		return http.get(this.getFreeBalanceOkeyApi, {params}).then((res) => res.data);
	}
}

export const tradingApi = new Trading();
export const recordApi = new Record();
export const consultApi = new Consult();
export const homeApi = new Home();
export const loginApi = new Login();
export const mineApi = new Mine();
export const UploadApi =wwwUrl + 'system/api/FileUpload/addFile';//上传图片地址
