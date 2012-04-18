# stuff for jasmine
begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :server do
	`thin -R static.ru start`
end

task :styles  do
	`sass --watch css/sass:css -r ./css/sass/bourbon/lib/bourbon.rb`
end


task :deploy do
	to_keep = [ ".", "..", ".git", ".gitignore", "CNAME", "publish" ]

	# delete the local branch
	`git branch -D gh-pages`

	# checkout a fresh copy of the branch
	`git checkout -b gh-pages`

	# # delete everything we haven't explicitly set to keep
	# Dir.foreach(".") do |x| 
	# 	unless to_keep.include? x
	# 		FileUtils.rm_rf x
	# 	end
	# end

	# # cp everything from the publish dir up one step
	# Dir.foreach("publish") do |x| 
	# 	FileUtils.cp_r "publish/#{x}", x unless x == '.' ||  x == '..'
	# end

	# # delete the publish dir
	# FileUtils.rm_rf 'publish'

	# commit the state of the directory
	`git add .`
	`git add -u`
	`git commit -m 'deploying'`

	# destroy the remote branch
	`git push origin :gh-pages`

	# push up the new remote branch
	`git push origin gh-pages`

	# checkout the web_served branch
	`git checkout web_served`

	puts "The app has been deployed successfully!"
	

end

