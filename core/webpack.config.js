const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './index.tsx',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{ 
                test: /\.less$/,
                use: [ 
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 
                    'css-loader', 
                    'less-loader'
                ],
            }
		]
	},
    plugins: isProduction ? [new MiniCssExtractPlugin()] : [],
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../docs')
	}
};