<?php
$myPdo = null;
header('Access-Control-Allow-Origin: *');
require_once('/home/newsfeedsmartapp/public_html/libs2/functions.php');
$obj = new Functions("dubai");
$data = $_POST["data"];
$uid = $_POST["user_id"];
 

function isMobile()
{
    return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}
 $action = $_POST['action'];
 $token = $obj->getToken(20,25);
switch ($action) {
    
 case "create_user":
        $device = "web";
        if (isMobile()) {
            $device = "mobile";
        }
        $uid = $obj->createUser("tracking_data_count", $device,array("game_key"=>substr($token,5,12)));
      echo json_encode(array("user_id"=>$uid,'game_key' => $token));
    break;
}