<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Account_Db extends CI_Model{


    public function getMoneyBalance($sessionName){ //retreive variable from controller and select by usersession
         
        $query=$this->db->query("SELECT macc_balance FROM apdb_moneyacc WHERE macc_username=" . "'" . $sessionName . "'");
        return $query->result();
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
      
    }
    
    public function getAllGold($sessionName){
        
        $query=$this->db->query("SELECT SUM(gacc_weight),COUNT(gacc_id) FROM apdb_goldacc WHERE gacc_username=" . "'" . $sessionName . "'");
        return $query->result();
        if ($query->num_rows() >= 1) {
            return true;
        } else {
            return false;
        }
        
    }
        
 
    public function getAllSilver($sessionName){
        

        $query=$this->db->query("SELECT SUM(sacc_weight),COUNT(sacc_id) FROM apdb_silveracc WHERE sacc_username=" . "'" . $sessionName . "'");
        return $query->result();
        if ($query->num_rows() >= 1) {
            return true;
        } else {
            return false;
        }
        
    }

    public function getSetting($sessionName){ //retreive variable from controller and select by usersession
         
        $query=$this->db->query("SELECT members_fb,members_twt,members_pin_no FROM apdb_members WHERE members_username=" . "'" . $sessionName . "'");
        return $query->result();
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
      
    }

    public function getGoldList($sessionName) {


        $query=$this->db->query("SELECT * FROM apdb_goldacc WHERE gacc_username=" . "'" . $sessionName . "'");
        return $query->result();
        if ($query->num_rows() >= 1) {
            return true;
        } else {
            return false;
        }

    }

    public function getSilverList($sessionName) {

        $query=$this->db->query("SELECT * FROM apdb_silveracc WHERE sacc_username=" . "'" . $sessionName . "'");
        return $query->result();
        if ($query->num_rows() >= 1) {
            return true;
        } else {
            return false;
        }

    }

    public function getPinCode($sessionName) {

        $query=$this->db->query("SELECT members_pin_no FROM apdb_members WHERE members_username=" . "'" . $sessionName . "'");
        return $query->result();
        if ($query->num_rows() >= 1) {
            return true;
        } else {
            return false;
        }

    }

    public function add_trans()
    {
        $add_trans = array(
            'temp_receiver_name' => $this->input->post('temp_receiver_name'),
            'temp_via' => $this->input->post('temp_via'),
            'temp_date' => $this->input->post('temp_date'),
            'temp_type' => $this->input->post('temp_type'),
            'temp_total' => $this->input->post('temp_total'),
            'temp_message' => $this->input->post('temp_message'),
            'temp_status' => $this->input->post('temp_status'),
            'temp_sender' => $this->input->post('temp_sender'),
            'temp_itemid' => $this->input->post('temp_itemid'),
            'temp_receiver_id' => $this->input->post('temp_receiver_id'),
            'temp_unique' => $this->input->post('temp_unique'),
            'temp_receiver_username' => $this->input->post('temp_receiver_username')
        );

        $this->db->insert('apdb_temp', $add_trans);


    }

    public function add_pin()
    {
        $add_pin = array(
            'members_pin_no' => $this->input->post('members_pin_no')
        );

        $username = $this->input->post('members_username');

        $this->db->where('members_username', $username);
        $this->db->update('apdb_members', $add_pin);


    }

    public function add_social()
    {
        $add_social = array(
            'members_twt' => $this->input->post('members_twt'),
            'members_fb' => $this->input->post('members_fb')
        );

        $username = $this->input->post('members_username');

        $this->db->where('members_username', $username);
        $this->db->update('apdb_members', $add_social);


    }

    public function getTransDetail($urlId){ //retreive variable from controller and select by usersession
         
        $query=$this->db->query("SELECT * FROM apdb_temp WHERE temp_unique='" . $urlId . "' AND temp_status='Pending'");
        return $query->result();
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
      
    }

    public function getLoginTwt($username,$password,$screenname){ //retreive variable from controller and select by usersession
         
        $query=$this->db->query("SELECT * FROM apdb_members WHERE members_username='" . $username . "' AND members_password='". $password ."' AND members_twt='https://twitter.com/". $screenname ."'");
        return $query->result();
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
      
    }

    public function getLoginFb($username,$password,$screenname){ //retreive variable from controller and select by usersession
         
        $query=$this->db->query("SELECT * FROM apdb_members WHERE members_username='" . $username . "' AND members_password='". $password ."' AND members_fb='https://www.facebook.com/". $screenname ."'");
        return $query->result();
        if ($query->num_rows() == 1) {
            return true;
        } else {
            return false;
        }
      
    }

    public function acceptTrans(){
            $update_trans = array(
                'temp_status' => $this->input->post('temp_status')
            );
            $id = $this->input->post('temp_id');
            $this->db->where('temp_id', $id);
            $this->db->update('apdb_temp', $update_trans);
        }

        public function changeOwnerSilver(){
            $changeOwnerSilver = array(
                'sacc_username' => $this->input->post('sacc_username')
            );
            $itemid = $this->input->post('temp_itemid');

            $id = array_map('intval', explode(',', $itemid));
            
            foreach($id as $id_split){
            $this->db->where('sacc_id', $id_split);
            $this->db->update('apdb_silveracc', $changeOwnerSilver); 
            }

            
        }

        public function changeOwnerGold(){
            $changeOwnerGold = array(
                'gacc_username' => $this->input->post('gacc_username')
            );
            $itemid = $this->input->post('temp_itemid');

            $id = array_map('intval', explode(',', $itemid));
            
            foreach($id as $id_split){
            $this->db->where('gacc_id', $id_split);
            $this->db->update('apdb_goldacc', $changeOwnerGold); 
            }

            
        }

        public function transferMoney(){

            // receive money
            $username = $this->input->post('macc_username');
            $sender = $this->input->post('macc_sender');
            $amount = $this->input->post('macc_amount');
            $amounts = floatval($amount);

            $this->db->set('macc_balance', 'macc_balance +' .$amounts, FALSE)
                    ->where('macc_username',$username)
                    ->update('apdb_moneyacc');

            $this->db->set('macc_balance', 'macc_balance -' .$amounts, FALSE)
                    ->where('macc_username',$sender)
                    ->update('apdb_moneyacc'); 
        
            //deduct money

        }

        public function getHistory($sessionName) {


        $query=$this->db->query("SELECT * FROM apdb_temp WHERE temp_sender=" . "'" . $sessionName . "'");
        return $query->result();
        if ($query->num_rows() >= 1) {
            return true;
        } else {
            return false;
        }

    }

    public function getPending($sessionName) {


        $query=$this->db->query("SELECT * FROM apdb_temp WHERE temp_sender=" . "'" . $sessionName . "'AND temp_status='Pending'");
        return $query->result();
        if ($query->num_rows() >= 1) {
            return true;
        } else {
            return false;
        }

    }

    public function getComplete($sessionName) {


        $query=$this->db->query("SELECT * FROM apdb_temp WHERE temp_sender=" . "'" . $sessionName . "'AND temp_status='Complete'");
        return $query->result();
        if ($query->num_rows() >= 1) {
            return true;
        } else {
            return false;
        }

    }





    }
    


