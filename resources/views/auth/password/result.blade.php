@extends('layouts.app')

@section('content')
<div class="container">
    <div class="alert alert-{{$alert}}" role="alert">
        <h4 class="alert-heading">{{ $title}}</h4>
        <p>
            {{$msg}}
        </p>
        @if (isset($link))
        <p>
            <a class="alert-link" href="{{$link['url']}}">{{$link['name']}}</a>
        </p>
        @endif
    </div>
</div>
@endsection