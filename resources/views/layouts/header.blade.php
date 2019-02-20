<?php
$weekText      = array("일", "월", "화", "수", "목", "금", "토");
$server_time   = $nowdate = time();
$weekDay = $weekText[date("w", $server_time)];
$realymd = date("Y-m-d", $server_time);
$realhis = date("H:i", $server_time);
?>

<header>
    <nav class="float-left positon-relative">
        <a href="#">
            <img src="/images/white.png" alt="로고" class="position-absolute">
            <p class="position-absolute">첫 화면으로</p>
        </a>
    </nav>
    <div class="content_header float-right positon-relative">
        <div>
            <p>DASHBOARD</p>
            <p id="realTimeDate"><?=$realymd?> (<?=$weekDay?>) <?=$realhis?></P>
        </div>
        <div class="position-absolute">
            <p>열혈분식 구리점</p>
        </div>
        <div class="position-absolute">
            <a href="#">
                <img src="/images/miss-call.png" alt="">
                <span class="badge badge-primary badge-pill position-absolute">99+</span>
            </a>
        </div>
    </div>
</header>
