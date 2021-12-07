<?php
    require './Models/Database.php';

    class Cocktail extends Database{
        public $id;
        public $name;
        public $alcoholContent;
        public $description;
        protected $conn;

        function __construct()
        {
            $database = new Database();
            $this->conn = $database->getConnection();
        }

        function getCocktails(){
            $sql = "SELECT * FROM cocktails";
            try{
                $stmt = $this->conn->prepare($sql);
                $stmt->execute();
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        function getCocktailById(){
            $sql = "SELECT * FROM cocktails WHERE id=:id";
            try{
                $stmt = $this->conn->prepare($sql);
                $data = ['id' => $this->id];
                $stmt->execute($data);
                return $stmt->fetch(PDO::FETCH_ASSOC);
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        function deleteCocktailById(){
            $sql = "DELETE FROM cocktails WHERE id =:id";
            try{
                $stmt = $this->conn->prepare($sql);
                return $stmt->execute(['id' => $this->id]);
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        function insertCocktail(){
            $sql = "INSERT INTO cocktails(name, alcoholContent, description)
            VALUES (:name, :alcoholContent, :description)";
            try{
                $stmt = $this->conn->prepare($sql);
                $data = [
                    'name' => $this->name,
                    'alcoholContent' => $this->alcoholContent,
                    'description' => $this->description
                ];
                return $stmt->execute($data);
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        function updateCocktailById(){
            $sql = "UPDATE cocktails 
            SET name=:name, alcoholContent=:alcoholContent, description=:description
            WHERE id=:id";
            try{
                $stmt = $this->conn->prepare($sql);
                return $stmt->execute([
                    'id' => $this->id,
                    'name' => $this->name,
                    'alcoholContent' => $this->alcoholContent,
                    'description' => $this->description
                ]);
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        function createCocktail($data){
            if (isset($data->name) !== NULL)
                $this->name = $data->name;
            if (isset($data->alcoholContent) !== NULL)
                $this->alcoholContent = $data->alcoholContent;
            if (isset($data->description) !== NULL)
                $this->description = $data->description;
        }

    }
?>