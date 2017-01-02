<?php
header('Access-Control-Allow-Origin: *');
class Social_connect extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->helper(array('form', 'url'));
                $this->load->model('account_db');
                $this->load->database();
                $this->load->library('session');
                $this->load->library(array('twconnect'));                
        }


        public function getPin() {
                
                $this->load->model('account_db');
                $getPin  = $this->account_db->add_pin();
        
                if(!empty($getPin)){
                        return true;
                }else{
                        return false;
                }
        } 

        public function redirect() {
                
                $ok = $this->twconnect->twredirect('social_connect/callback');

                if (!$ok) {

                        redirect('http://localhost/scorpion/www/member/twitter_error.html');
                }
                
        }


        public function callback() {
                               
                $ok = $this->twconnect->twprocess_callback();
                echo json_encode($ok);
                
                if ( $ok ) { 
                        $this->session->set_userdata('login',true);
                        redirect('http://localhost/scorpion/www/index.html#'); }
                        else redirect ('social_connect/failure');
                        
}


        public function success() {
                
                $this->twconnect->twaccount_verify_credentials();

                
                $user_profile = $this->twconnect->tw_user_info;
                
                
                

                $arr = array(
                        'id_str' => $user_profile->id_str,
                        'name' => $user_profile->name,
                        'profile_image_url' => $user_profile->profile_image_url,
                );
                echo json_encode($arr);
                //$this->session->set_userdata('user_profile',$arr);
                
                
        }



        public function failure() {

                redirect('http://localhost/scorpion/www/member/twitter_error.html');
        }
        
       /* public function profile(){
                if($this->session->userdata('login') != true){
                        redirect('');
                }
                $contents['user_profile'] = $this->session->userdata('user_profile');
                $this->load->view('profile',$contents);
                
        }*/
        
        public function logout(){
                $logout = $this->session->sess_destroy();
                $this->session->unset_userdata('login');
                redirect('');
                //echo json_encode($logout);
                
        }

        public function checkSession(){
                $sess_id = $this->session->userdata('login');

   if(!empty($sess_id))
   {
        echo "got session";

   }else{

        echo "no session";      
   } 
        }


        public function getFb() {
                
                $this->load->model('account_db');
                $getFb  = $this->account_db->add_fb();
        
                if(!empty($getFb)){
                        return true;
                }else{
                        return false;
                }
        }

        public function getTwt() {
                
                $this->load->model('account_db');
                $getTwt  = $this->account_db->add_twt();
        
                if(!empty($getTwt)){
                        return true;
                }else{
                        return false;
                }
        }

        
}