const supabaseAdmin = require('../config/supabase');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    // Verify the token and get user info
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error || !data.user) {
      throw new Error('Invalid token');
    }
    
    // Attach user to request for route handlers
    req.user = data.user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticate;