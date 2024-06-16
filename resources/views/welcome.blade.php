@section('title', 'Home')

@extends('layout.layout')

@section('content')


    <div class="relative flex flex-wrap gap-5  p-10 min-h-screen ">
        @forelse ($pens as $pen)
            @include('components.editorCard')
        @empty
            <div class="text-center self-center w-full h-full">
                <h1 class="text-white text-7xl">No Pens</h1>
            </div>
        @endforelse
        <div class="mt-3 w-full self-end">
            {{ $pens->withQueryString()->links() }}
        </div>
    </div>

@endsection
