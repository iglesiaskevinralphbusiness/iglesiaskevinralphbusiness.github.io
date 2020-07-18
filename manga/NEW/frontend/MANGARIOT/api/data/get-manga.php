<?php
    include( "../header-type.php" );
    include( "../db-connection.php" );

    $manga_obj = new stdClass;
    $url = '';

    if(isset($_POST['url'])){
        $url = $_POST['url'];
    }



    //select manga
    $sql = "SELECT * FROM manga WHERE url = '$url' LIMIT 1";
    $result_manga = $conn->query($sql);
    $total_manga = $result_manga->num_rows;
    while($row_manga = $result_manga->fetch_assoc()) {
        $manga_obj->id = $row_manga["id"];
        $manga_obj->name = $row_manga["name"];
        $manga_obj->alternative_name = $row_manga["alternative_name"];
        $manga_obj->url = $row_manga["url"];
        $manga_obj->status = $row_manga["status"];
        $manga_obj->type = $row_manga["type"];
        $manga_obj->total_views = $row_manga["total_views"];
        $manga_obj->date_crawled = $row_manga["date_crawled"];
        $manga_obj->photo = $row_manga["photo"];
        $manga_obj->date_last_crawled = $row_manga["date_last_crawled"];
        $manga_obj->description = $row_manga["description"];

        //select authors
        $authors = array();
        $sql = "SELECT * FROM authors WHERE manga_id = '$manga_obj->id'";
        $result_authors = $conn->query($sql);
        while($row_mauthors = $result_authors->fetch_assoc()) {
            $authors_obj = new stdClass;
            $authors_obj->name = $row_mauthors['name'];
            $authors_obj->url = $row_mauthors['url'];
            array_push($authors, $authors_obj);
        }
        $manga_obj->authors = $authors;

        //select categories
        $categories = array();
        $sql = "SELECT * FROM categories WHERE manga_id = '$manga_obj->id'";
        $result_categories = $conn->query($sql);
        while($row_categories = $result_categories->fetch_assoc()) {
            $categories_obj = new stdClass;
            $categories_obj->name = $row_categories['name'];
            $categories_obj->url = $row_categories['url'];
            array_push($categories, $categories_obj);
        }
        $manga_obj->categories = $categories;

        //select all chapters
        $chapters = array();
        $sql = "SELECT * FROM chapters WHERE manga_id = '$manga_obj->id' ORDER BY order_id DESC";
        $result_chapters = $conn->query($sql);
        while($row_chapters = $result_chapters->fetch_assoc()) {
            $chapters_obj = new stdClass;
            $chapters_obj->id = $row_chapters['id'];
            $chapters_obj->date = $row_chapters['date'];
            $chapters_obj->date_crawled = $row_chapters['date_crawled'];
            $chapters_obj->name = $row_chapters['name'];
            $chapters_obj->url = $row_chapters['url'];
            array_push($chapters, $chapters_obj);
        }
        $manga_obj->chapters = $chapters;
    }

    if($total_manga > 0){
        echo json_encode($manga_obj);
    } else {
        echo "null";
    }
?>