-- Add indexes for frequently queried and sorted columns
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_updated_at ON products(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_date_added ON products(date_added DESC);

-- Composite index for category + date queries (common pattern)
CREATE INDEX IF NOT EXISTS idx_products_category_created_at ON products(category, created_at DESC);

-- Analyze table to update query planner statistics
ANALYZE products;