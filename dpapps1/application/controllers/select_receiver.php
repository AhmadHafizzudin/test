<?php
require_once APPPATH . 'libraries/TwitterAPIExchange.php';

class Select_receiver extends CI_Controller
{
    
    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form','url'));
        $this->load->library('session');
        $this->load->library(array('TwitterAPIExchange'));
    }
    
    
    public function getTwtFollower()
    {

        $sess_token = $this->session->userdata['tw_access_token']['oauth_token'];
        $sess_token_secret = $this->session->userdata['tw_access_token']['oauth_token_secret'];
        $screenname = $this->session->userdata['tw_access_token']['screen_name'];

        //echo json_encode($sess_token_secret);
        
        /** Set access tokens here - see: https://dev.twitter.com/apps/ **/
        $settings = array(
            'oauth_access_token' => $sess_token,
            'oauth_access_token_secret' => $sess_token_secret,
            'consumer_key' => "jMw4oy0jXlWoStF21H8emTamJ",
            'consumer_secret' => "IPPPPcdUyJIAt5NRH5c3TeP03oSJELMRKT7X69fhqAwqhxURo7"
        );

       //echo json_encode($screenname);
        

        $url           = 'https://api.twitter.com/1.1/followers/ids.json';
        $getfield      = '?screen_name='.$screenname.'&skip_status=true&include_user_entities=false';
        $requestMethod = 'GET';
        $twitter       = new TwitterAPIExchange($settings);
        $fid           = $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();
        
        $fid = json_decode($fid, true, 512, JSON_BIGINT_AS_STRING);
        
        if (isset($fid['ids']) && is_array($fid['ids'])) {
            $idsArray = $fid['ids'];
            //var_dump($idsArray); // that is the array you need
            //var_dump($fid['ids']);

            $result = array();

            foreach ($idsArray as $user) {

                
                
                $url1          = 'https://api.twitter.com/1.1/users/lookup.json';
                $getfield1     = '?user_id=' . $user;
                $requestMethod = 'GET';
                $twitter1      = new TwitterAPIExchange($settings);
                $fdetails      = $twitter1->setGetfield($getfield1)->buildOauth($url1, $requestMethod)->performRequest();
                
                $fdetails = json_decode($fdetails, true);
                
                //var_dump($fdetails);
                
                foreach ($fdetails as $fdetail) {
                    
                    
                    //echo $fdetail['id_str'] . "<br>";
                    //echo $fdetail['name'] . "<br>";
                    //echo $fdetail['profile_image_url'] . "<br>";

                    $data = array(
                        'id_str' => $fdetail['id_str'],
                        'name' => $fdetail['name'],
                        'profile_image_url' => $fdetail['profile_image_url'],
                        'screen_name' => $fdetail['screen_name'],
                );
                    

                    array_push($result,$data);
                    
                }
                
                
            }
            echo json_encode($result);
            //echo gettype($data);
                
            
        } else {
            die('Cannot load data');
        }
        
    }

    public function twtSession(){
        
        $sess_id = $this->session->userdata('login');

        if(!empty($sess_id)){
            $twt = "true";

        }else{

            $twt = "false";      
        } 

        echo json_encode($twt);
    }
    
    
}