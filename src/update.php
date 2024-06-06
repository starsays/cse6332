<?php

// 设置响应头
header('Content-Type: application/json');

// 定义 CSV 文件路径
$csvFilePath = 'q1x.csv';

// 接收来自前端的 CSV 数据
$csvData = file_get_contents('php://input');

// 如果接收到了 CSV 数据
if ($csvData !== false) {
    // 将 CSV 数据写入文件
    $result = file_put_contents($csvFilePath, $csvData);

    // 检查是否成功写入文件
    if ($result !== false) {
        // 读取更新后的 CSV 文件内容并返回给前端
        $updatedData = readCSVData($csvFilePath);
        echo json_encode($updatedData);
    } else {
        // 返回写入失败的错误信息
        http_response_code(500);
        echo json_encode(array('error' => 'Failed to write CSV data to file'));
    }
} else {
    // 返回没有接收到 CSV 数据的错误信息
    http_response_code(400);
    echo json_encode(array('error' => 'No CSV data received'));
}

// 读取 CSV 数据并转换为数组
function readCSVData($filePath) {
    $data = array();
    if (($handle = fopen($filePath, 'r')) !== FALSE) {
        while (($row = fgetcsv($handle, 1000, ',')) !== FALSE) {
            $data[] = $row;
        }
        fclose($handle);
    }
    return $data;
}

?>