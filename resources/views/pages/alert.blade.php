@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <h1>{{config('app.name')}}</h1>
    </div>
    <div class="row justify-content-center">
        @if (old('alert') && old('msg'))
        <p class="alert alert-{{ old('alert') }}">{{ old('msg')}} <a href="#" class="close" data-dismiss="alert"
                aria-label="close">&times;</a></p>
        @endif
    </div>
</div>
@endsection