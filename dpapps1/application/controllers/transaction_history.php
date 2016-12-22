<?php

class Transaction_history extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->helper(array('form', 'url'));
                $this->load->model('account_db');
                $this->load->database();
                $this->load->library('session');                
        }


        public function viewHistory() { 

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');        
        $data['results'] = $this->account_db->getHistory($sessionName);
        echo json_encode($data);              
        }

        public function viewPending() { 

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');        
        $data['results'] = $this->account_db->getPending($sessionName);
        echo json_encode($data);              
        }

        public function viewComplete() { 

        $sessionName = $this->session->userdata('username'); //get value in session
        $this->load->model('account_db');        
        $data['results'] = $this->account_db->getComplete($sessionName);
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
        //$result = $this->account_db->getMoneyBalance($sessionName);
        //die($usersession);
        print_r($sessionName);
        }
}