import os
from django.conf import settings
import matplotlib.pyplot as plt

def save_plot_as_image(filename):
    
    # Create the directory if it doesn't exist
    plot_dir = os.path.join(settings.MEDIA_ROOT, 'plots')
    os.makedirs(plot_dir, exist_ok=True)

    # Save the plot as an image file
    image_path = os.path.join(plot_dir, filename)
    plt.savefig(image_path)
    plt.close()
    
    Image_url = settings.MEDIA_URL + 'plots/' + filename
    print(Image_url)

    # Return the relative path to the saved image
    #return os.path.join('plots', filename)
    return Image_url