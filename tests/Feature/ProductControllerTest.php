<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductControllerTest extends TestCase
{

    use RefreshDatabase;
    use WithFaker;

    public function test_can_list_products()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->getJson(route('product.index'));
        $response->assertStatus(200);
    }
}
