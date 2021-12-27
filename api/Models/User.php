<?php

    require './Models/Database.php';
    class User extends Database{
        public $id;
        public $name;
        public $surname;
        public $email;
        public $password;
        protected $conn;

        function __construct()
        {
            $database = new Database();
            $this->conn = $database->getConnection();
        }

        function getUsers(){
            $sql ="SELECT * FROM Users";
            try{
                $stmt = $this->conn->prepare($sql);
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        function getUserById(){
            $sql = "SELECT * FROM Users WHERE id = :id";
            try{
                $stmt = $this->conn->prepare($sql);
                if ($stmt->execute(['id' => $this->id]))
                    return $stmt->fetch(PDO::FETCH_ASSOC);
                else
                    return NULL;
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        function insertUser(){
            $sql = "INSERT INTO Users(name, surname, email, password)
            VALUES (:name, :surname, :email, :password)";
            try{
                $stmt = $this->conn->prepare($sql);
                return $stmt->execute([
                    'name' => $this->name,
                    'surname' => $this->surname,
                    'email' => $this->email,
                    'password' => password_hash($this->password, PASSWORD_DEFAULT)
                ]);
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        function deleteUserById(){
            $sql = "DELETE FROM Users WHERE id = :id";
            try{
                $stmt = $this->conn->prepare($sql);
                return $stmt->execute(['id' => $this->id]);
            }catch(PDOException $e){
                $e->getMessage();
            }
        }

        function updateUserById(){
            $sql = "UPDATE Users
            SET name = :name, surname = :surname, email = :email
            WHERE id = :id";
            try{
                $stmt = $this->conn->prepare($sql);
                return $stmt->execute([
                    'name' => $this->name,
                    'surname' => $this->surname,
                    'email' => $this->email,
                    'id' => $this->id
                ]);
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        function login(){
            $sql ="SELECT password 
            FROM Users WHERE email = :email";
            try{
                $stmt = $this->conn->prepare($sql);
                $stmt->execute(['email' => $this->email]);
                $hashPassword = $stmt->fetch()[0];
                if (isset($hashPassword)){
                    if (password_verify($this->password, $hashPassword))
                        return true;
                    else 
                        return "You have inserted a wrong password!";
                }
                return "Email or password wrong!";
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        function createUser($data){
            if (isset($data->id))
                $this->id = $data->id;
            if (isset($data->name))
                $this->name = $data->name;
            if (isset($data->surname))
                $this->surname = $data->surname;
            if (isset($data->email))
                $this->email = $data->email;
            if (isset($data->password))
                $this->password = $data->password;
        }
    }
?>