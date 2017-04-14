const path = require('path');

module.exports = {
    entry: "./app",
    output: {
        path: path.resolve(__dirname, "app"),
        filename: "bundle.js"
    },

    devServer: {
        contentBase: path.join(__dirname, "app"),
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },

	devtool: 'cheap-module-eval-source-map',

    module: {
        loaders: [
            { // js
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: [['env', { 
                        modules: false,
                        targets: {
                            browsers: ["last 2 versions"]
                        }
                    }]]
                }
            },

			{   // html
				test: /\.html$/,
				exclude: [/node_modules/],
				use: 'raw-loader',
			},

            { // css
                test: /\.css$/,
                exclude: [/node_modules/],
				use: [ 'style-loader', 'css-loader' ],
            },

        ]
    }

}