<?php
class Receive_transaction extends CI_Controller {

   public function __construct() {
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

   public function getUrlId() { //retreive username session from sessionstroge javascript and pass to model
      //$usersession= $this->input->post('usersession');
      $sessiondata = array('urlid' => $this->input->post('urlid'));

      $this->session->set_userdata($sessiondata); //set user into session
      $urlId = $this->session->userdata('urlid'); //get value in session
      //$result = $this->account_db->getMoneyBalance($urlId);
      //die($usersession);
      print_r($urlId);
   }

   public function checkLoginTwt() { //get username and pass from db
      $username = $this->session->userdata('username'); //get value in session
      $password = $this->session->userdata('password'); //get value in session
      $screenname = $this->session->userdata('screenname'); //get value in session
      $this->load->model('account_db');
      $data['results'] = $this->account_db->getLoginTwt($username, $password,$screenname);
      echo json_encode($data);
   }

   public function getLoginDetailTwt() { //confirm receive transaction by login
      
      $sessiondata = array('username' => $this->input->post('username'), 'password' => $this->input->post('password'),'screenname' => $this->input->post('screenname'));

      $this->session->set_userdata($sessiondata); //set user into session
      $username = $this->session->userdata('username'); //get value in session
      $password = $this->session->userdata('password'); //get value in session
      $screenname = $this->session->userdata('screenname'); //get value in session
      
      print_r($password);
      print_r($username);
   }

   public function checkLoginFb() { //get username and pass from db
      $username = $this->session->userdata('username'); //get value in session
      $password = $this->session->userdata('password'); //get value in session
      $screenname = $this->session->userdata('screenname'); //get value in session
      $this->load->model('account_db');
      $data['results'] = $this->account_db->getLoginFb($username, $password,$screenname);
      echo json_encode($data);
   }

   public function getLoginDetailFb() { //confirm receive transaction by login
      
      $sessiondata = array('username' => $this->input->post('username'), 'password' => $this->input->post('password'),'screenname' => $this->input->post('screenname'));

      $this->session->set_userdata($sessiondata); //set user into session
      $username = $this->session->userdata('username'); //get value in session
      $password = $this->session->userdata('password'); //get value in session
      $screenname = $this->session->userdata('screenname'); //get value in session
      
      print_r($password);
      print_r($username);
   }


   public function updateTrans() {

      $this->load->model('account_db');

      if ($query = $this->account_db->acceptTrans()) {
         return true;
      }
      else {
         return false;
      }
   }

   public function changeOwnerSilver() {

      $this->load->model('account_db');

      if ($query = $this->account_db->changeOwnerSilver()) {
         return true;
      }
      else {
         return false;
      }
   }

   public function changeOwnerGold() {

      $this->load->model('account_db');

      if ($query = $this->account_db->changeOwnerGold()) {
         return true;
      }
      else {
         return false;
      }
   }

   public function transferMoney() {

      $this->load->model('account_db');

      if ($query = $this->account_db->transferMoney()) {
         return true;
      }
      else {
         return false;
      }
   }

}

