@extends('layouts.backend')

@section ('css')
@parent
@endsection

@section('content')

<div class="flex-header">
    <div class="flex-item">1</div>
    <div class="flex-item">2</div>
    <div class="flex-item">3</div>
    <div class="flex-item">4</div>
    <div class="flex-item">5</div>
</div>
<div class="flex-contents">
    <div class="box1">
        <h1 class="text-white">box1</h1>
    </div>
    <div class="box2">
        <div>
            <h1 class="text-white">box2</h1>
        </div>
        <div>
            <h1 class="text-white">box3</h1>
        </div>
    </div>
</div>


@endsection


@section ('js')
@parent
@endsection
