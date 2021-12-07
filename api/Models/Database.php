<?php
class Database
{
    private $host = 'localhost';
    private $dbname = 'cocktails';
    private $user = 'root';
    private $password = '';
    protected $dbh;

    function __construct()
    {
        try {
            $this->dbh = new PDO('mysql:host=localhost;dbname=cocktails', $this->user, $this->password);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    function getConnection(){
        return $this->dbh;
    }

    function __destruct()
    {
        $this->dbh = null;
    }
}
