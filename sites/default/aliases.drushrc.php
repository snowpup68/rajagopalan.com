<?php
$aliases['local'] = array(
    'root' => '/usr/share/nginx/html/rajagopalan.com', 
    'uri'  => 'default',
);

$aliases['prod'] = array(
    'uri'  => 'www.rajagopalan.com',
    'root' => '/usr/share/nginx/html', 
    'remote-host' => 'rajagopalan.com',
    'remote-user' => 'root',
);
