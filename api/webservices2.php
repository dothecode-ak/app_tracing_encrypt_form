<?php

header('Access-Control-Allow-Origin: *');
require_once('/home/newsfeedsmartapp/public_html/libs2/functions.php');
$obj = new Functions("india");
$uid = $_POST["user_id"];
$data = $_POST["data"];
$query = $obj->myPdo->from('tracking_data_count')->select(array('game_key'))->where('uid', $uid);
$user = $query->fetch();
if (count($user) > 1) {
    $key = $user["game_key"];
    $dataAr = explode(".", $data);
    $hader = $dataAr[0];
    $pay = $dataAr[1];
    $sig = $dataAr[2];

    $my_sig = hash_hmac('sha256', $hader . "." . $pay, $key);
    $hed = base64_decode($hader);
    $decode_pay = json_decode(base64_decode($dataAr[1]), true);
    if ($decode_pay["t"] == $hed) {
        $r2 = $sig[0];
        $r1 = $sig[1];

        $x = substr($sig, 2);
        $a_sig = substr($x, 0, $r1) . substr($x, $r1 + $r2);
        $my_sig = base64_encode(hash_hmac('sha256', $hader . "." . $pay, $key));

        if ($my_sig == $a_sig) {
            $array_str = base64_decode($pay);
            $json = json_decode($array_str, true);

            if ($user_id == $json["user_id"]) {
                $out["code"] = 200;
                $action = $json["saveType"];

                switch ($action) {
                 case "start":
                  buttonIncrement($uid,$json['saveType']);
                    break;
                    case "userData":
                        userData($json['saveType'],$uid,$json["username"],$json["password"]);
                        break;
                    default:
                        $response = array(
                            "status" => 400,
                            "message" => "Operation not found"
                        );
                        echo json_encode($response);
                        break;
                }
            }
        } else {
            echo json_encode(["status" => 406, "msg" => "Signature Mismatch"]);
        }
    } else {
        echo json_encode(["status" => 406, "msg" => "Time Mismatch"]);
    }
} else {
    echo json_encode(["status" => 406, "msg" => "User not found"]);
}


function buttonIncrement($uid,$saveType)
{
    global $obj;
     $res1= $obj->clickUpdater("tracking_data_count", $uid,$saveType);
     echo ($res1);
}

function userData($saveType, $uid,$username,$password)
{
    global $obj;
    if ($saveType=='userData') {
     $data= array('username' => $username,'password' => base64_encode($password));
     $res2=$obj->updateData('tracking_data_count', $data, array('uid'=>$uid));
    print_r($password);
}
}