// Thêm plugin copy-webpack-plugin để copy file firebase-messaging-sw.js ra thư mục build (thường là dist/)
// Điều này cần thiết để sử dụng Firebase Cloud Messaging (FCM) cho push notification trên web.
// Import hàm tạo cấu hình Webpack mặc định của Expo
const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// Import plugin Webpack dùng để copy file/thư mục vào output folder khi build
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Import module path của Node.js để xử lý đường dẫn tương thích trên các hệ điều hành
const path = require('path');

// env: môi trường build (development/production).
// argv: các tham số dòng lệnh Webpack.
module.exports = async function(env, argv) {
  // Tạo cấu hình Webpack mặc định từ Expo
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Copy file firebase-messaging-sw.js từ thư mục gốc của project.
  // Đặt vào thư mục build (gốc của output folder).
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'firebase-messaging-sw.js'),
          to: 'firebase-messaging-sw.js',
        },
      ],
    })
  );
  return config;
};