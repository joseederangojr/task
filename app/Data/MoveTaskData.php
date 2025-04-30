<?php

namespace App\Data;

class MoveTaskData
{
    public function __construct(public int $order, public int $columnId) {}
}
