const supabaseAdmin = require('../config/supabase');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    // Get user from token
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error) {
      console.error('Token verification error:', error);
      throw error;
    }
    
    if (!data.user) {
      throw new Error('User not found');
    }
    
    console.log('Authentication successful for user:', data.user.id);
    
    // Attach user to request
    req.user = data.user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized: ' + error.message });
  }
};

module.exports = authenticate