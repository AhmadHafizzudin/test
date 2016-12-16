<?php

class Login extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
                $this->load->helper(array('form', 'url'));
                $this->load->model('account_db');
                $this->load->database();
                $this->load->library('session');                
        }



        public function viewTransDetail() { //retreive query result from getMoneyBalance()

        $urlId = $this->session->userdata('urlid'); //get value in session
        $this->load->model('account_db');
        $data['results'] = $this->account_db->getTransDetail($urlId);
        echo json_encode($data);       
        }

        public function getUrlId(){ //retreive username session from sessionstroge javascript and pass to model

        //$usersession= $this->input->post('usersession');
        $sessiondata = array(
                   'urlid'  => $this->input->post('urlid')
               );

        $this->session->set_userdata($sessiondata);//set user into session
        $urlId = $this->session->userdata('urlid'); //get value in session
        $result = $this->account_db->getMoneyBalance($urlId);
        //die($usersession);
        print_r($urlId);
        }

        
}