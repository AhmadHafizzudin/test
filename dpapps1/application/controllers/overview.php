<?php

class Overview extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->helper(array('form', 'url'));
                $this->load->model('account_db');
                $this->load->database();
                $this->load->library('session');                
        }

        public function viewMoneyBalance() { //retreive query result from getMoneyBalance()

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');
        $data = $this->account_db->getMoneyBalance($sessionName);
        echo json_encode($data);       
        }

        public function viewAllGold() { 

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');        
        $data = $this->account_db->getAllGold($sessionName);

            echo json_encode($data); 
              
        }

        public function viewAllSilver() {   

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');
        $data = $this->account_db->getAllSilver($sessionName);
        echo json_encode($data);   
        }

        public function checkSetting() { //retreive query result from getMoneyBalance()

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');
        $data['results'] = $this->account_db->getSetting($sessionName);
        echo json_encode($data);       
        }

        public function getUserSession(){ //retreive username session from sessionstroge javascript and pass to model

        //$usersession= $this->input->post('usersession');
        $sessiondata = array(
                   'username'  => $this->input->post('usersession'),
                   'logged_in' => TRUE
               );

        $this->session->set_userdata($sessiondata);//set user into session
        $sessionName = $this->session->userdata('username'); //get value in session
        $result = $this->account_db->getMoneyBalance($sessionName);
        //die($usersession);
        print_r($sessionName);
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

        public function getSocial() {
                
                $this->load->model('account_db');
                $getSocial  = $this->account_db->add_social();
        
                if(!empty($getSocial)){
                        return true;
                }else{
                        return false;
                }
        }
}