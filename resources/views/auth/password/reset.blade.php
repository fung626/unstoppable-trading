@extends('layouts.app')

@section('content')
<div class="container">
    @if(Session::has('alert') && Session::has('msg'))
    <div class="alert alert-{{Session::get('alert')}} alert-dismissible fade show" role="alert">
        {{Session::get('msg')}}
        <button class="close" type="button" data-dismiss="alert" aria-label="Close"><span
                aria-hidden="true">×</span></button>
    </div>
    @endif
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="row justify-content-center">
                <h1 class="m-5">{{__('Reset Your Password')}}</h1>
            </div>

            <div class="card border-light bg-light">
                <div class="card-body">
                    <form method="POST" action="{{ route('password.reset') }}">
                        @csrf
                        <input type="hidden" name="token" value="{{ $token }}">
                        <input type="hidden" name="email" value="{{ $email }}">
                        <div class="form-group">
                            <label>{{ __('Password') }}</label>
                            <div>
                                <input id="password" type="password"
                                    class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}"
                                    name="password" required>
                                @if ($errors->has('password'))
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label>{{ __('Confirm Password') }}</label>
                            <div>
                                <input id="password-confirm" type="password" class="form-control"
                                    name="password_confirmation" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <div>
                                <button type="submit" class="btn btn-primary my-primary-btn">
                                    {{ __('Reset Password') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection