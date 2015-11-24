json.extract! @package, :id, :label, :tracking
json.status Package.statuses[@package.status]
json.shipping_fee @package.shipping_fee.to_f

