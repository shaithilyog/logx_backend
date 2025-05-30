const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Validate credentials
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials!');
  console.error('URL present:', !!supabaseUrl);
  console.error('Service key present:', !!supabaseServiceKey);
  process.exit(1);
}

console.log('Initializing Supabase admin client with URL:', supabaseUrl);
console.log('Service key first 10 chars:', supabaseServiceKey.substring(0, 10) + '...');

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = supabaseAdmin;