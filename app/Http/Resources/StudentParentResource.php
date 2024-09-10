<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentParentResource extends JsonResource
{
   public function toArray(Request $request)
   {
    $parent = parent::toArray($request);
    $parent['formatted_updated_at'] = $this->resource->updated_at->diffForHumans();
    return $parent;
   }
}
