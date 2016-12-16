<?php

class Sendpayment extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->helper(array('form', 'url'));
                $this->load->model('account_db');
                $this->load->database();
                $this->load->library('session');                
        }

        public function checkMoneyBalance() { //retreive query result from getMoneyBalance()

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');
        $data = $this->account_db->getMoneyBalance($sessionName);
        echo json_encode($data);       
        }

        public function listAllGold() { 

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');        
        $data['results'] = $this->account_db->getGoldList($sessionName);
        echo json_encode($data);              
        }

        public function listAllSilver() {   

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');
        $data['results'] = $this->account_db->getSilverList($sessionName);
        //echo gettype($data);
        echo json_encode($data);   
        }

        
}