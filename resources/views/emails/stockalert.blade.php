@component('mail::message')
{{ __('email.stockalert.header') }},

{{ __('email.stockalert.body') }}

@component('mail::table')

| {{ __('email.stockalert.table.header.name') }} | {{ __('email.stockalert.table.header.type') }} | {{ __('email.stockalert.table.header.cup') }} | {{ __('email.stockalert.table.header.color') }} | {{ __('email.stockalert.table.header.size') }} | {{ __('email.stockalert.table.header.barcode') }} | {{ __('email.stockalert.table.header.stock') }} |
|:----------------------------------------------:|:-----------------------------------------------:|:-----------------------------------------------:|:-----------------------------------------------:|:-----------------------------------------------:|:-----------------------------------------------:|:-----------------------------------------------:|
@foreach ($data as $item)
|{{ $item['name'] }}|{{ $item['type'] }}|{{ $item['cup'] }}|{{ $item['color'] }}|{{ $item['size'] }}|{{ $item['barcode'] }}|{{ $item['stock_unit'] }}|
@endforeach

@endcomponent

{{ __('Thanks') }},<br>
{{ config('app.name') }}
@endcomponent
