
function test_ajax_speed(){
	var nocache_url = "/ziteng/";
	var cache_url = "";
	
	var params = {};
	
	var non_cache_time = 0;
	var cache_time  = 0;
	
	
	var non_cache_start = new Date().getTime();
	$.post(nocache_url, parmas, function(data){
		var non_cache_end = new Date().getTime();
		non_cache_time = non_cache_end - non_cache_start;
		
		alert(non_cache_time);
	});
	
//	
//	var cache_start = new Date().getTime();
//	$.post(cache_url, params, function(data){
//		var cache_end = new Date().getTime();
//		cache_time = cache_end - cache_start;
//		
//		alert(cache_time);
//	});
	
}
